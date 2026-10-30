"""
Procedural moon renderer for the Lunare Global site.

Renders a near-side moon (maria placed at their real selenographic
positions, power-law crater field, Tycho/Copernicus ray systems) onto a
transparent PNG. Called by scripts/build-moon-assets.py during the build.

    python3 scripts/generate-moon.py moon-master.png 2048
"""
import sys
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else "moon-master.png"
SIZE = int(sys.argv[2]) if len(sys.argv) > 2 else 2048
rng = np.random.default_rng(7)

# ---------------------------------------------------------------- geometry
R = SIZE * 0.5 - 2
yy, xx = np.mgrid[0:SIZE, 0:SIZE].astype(np.float32)
sx = (xx - SIZE / 2 + 0.5) / R
sy = -(yy - SIZE / 2 + 0.5) / R
rr = np.sqrt(sx * sx + sy * sy)
inside = rr <= 1.0
sz = np.sqrt(np.clip(1 - rr * rr, 0, 1))

# Slight libration tilt so the face isn't perfectly square-on.
tilt = np.radians(6.0)
px, py, pz = sx, sy * np.cos(tilt) + sz * np.sin(tilt), -sy * np.sin(tilt) + sz * np.cos(tilt)


def lonlat_to_vec(lat, lon):
    la, lo = np.radians(lat), np.radians(lon)
    return np.array([np.cos(la) * np.sin(lo), np.sin(la), np.cos(la) * np.cos(lo)], dtype=np.float32)


def to_screen(v):
    # inverse of the tilt above
    x, y, z = v
    y2 = y * np.cos(tilt) - z * np.sin(tilt)
    z2 = y * np.sin(tilt) + z * np.cos(tilt)
    return x, y2, z2


# ------------------------------------------------------------------- noise
PERM = rng.permutation(256)
PERM = np.concatenate([PERM, PERM]).astype(np.int32)
GRAD = rng.standard_normal((256,)).astype(np.float32)


def value_noise(x, y, z):
    xi, yi, zi = np.floor(x).astype(np.int32), np.floor(y).astype(np.int32), np.floor(z).astype(np.int32)
    xf, yf, zf = x - xi, y - yi, z - zi
    u, v, w = [t * t * t * (t * (t * 6 - 15) + 10) for t in (xf, yf, zf)]
    xi, yi, zi = xi & 255, yi & 255, zi & 255

    def h(a, b, c):
        return GRAD[PERM[PERM[PERM[a] + b] + c]]

    x0 = h(xi, yi, zi) * (1 - u) + h(xi + 1, yi, zi) * u
    x1 = h(xi, yi + 1, zi) * (1 - u) + h(xi + 1, yi + 1, zi) * u
    x2 = h(xi, yi, zi + 1) * (1 - u) + h(xi + 1, yi, zi + 1) * u
    x3 = h(xi, yi + 1, zi + 1) * (1 - u) + h(xi + 1, yi + 1, zi + 1) * u
    return ((x0 * (1 - v) + x1 * v) * (1 - w) + (x2 * (1 - v) + x3 * v) * w)


def fbm(x, y, z, octaves, freq, gain=0.5):
    total = np.zeros_like(x)
    amp = 1.0
    norm = 0.0
    for i in range(octaves):
        total += amp * value_noise(x * freq + 13.1 * i, y * freq - 7.3 * i, z * freq + 3.7 * i)
        norm += amp
        amp *= gain
        freq *= 2.03
    return total / norm


print("noise…")
n_low = fbm(px, py, pz, 4, 2.2)
n_mid = fbm(px, py, pz, 5, 7.0)
n_hi = fbm(px, py, pz, 4, 60.0, 0.55)

# ------------------------------------------------------------------- maria
# (lat, lon, angular radius deg, darkness)
MARIA = [
    (33, -16, 19, 1.0),   # Imbrium
    (28, 17.5, 11, 0.95),  # Serenitatis
    (8.5, 31, 12, 1.0),   # Tranquillitatis
    (17, 59, 7.5, 1.0),   # Crisium
    (-7.8, 51.3, 9, 0.85),  # Fecunditatis
    (-15, 35, 5.5, 0.85),  # Nectaris
    (20, -55, 24, 1.0),   # Oceanus Procellarum (north)
    (-2, -48, 20, 0.95),  # Oceanus Procellarum (south)
    (30, -40, 14, 0.9),   # Procellarum / Imbrium junction
    (-21, -16.6, 10, 0.8),  # Nubium
    (-24, -39, 6.5, 0.9),  # Humorum
    (56, -8, 7, 0.7), (57, 12, 6, 0.7), (55, -30, 6, 0.65),  # Frigoris band
    (13, 3.6, 4.5, 0.8),  # Vaporum
    (-10, -23, 6, 0.75),  # Cognitum
    (7.5, -30.9, 7, 0.75),  # Insularum
    (-3, 15, 4.5, 0.55),  # Sinus Medii-ish
    (40, 30, 3.5, 0.6),   # Lacus Somniorum
]
mare = np.zeros_like(px)
warp = fbm(px + 4.1, py, pz, 5, 4.0)
n_edge = fbm(px, py + 2.7, pz, 6, 11.0, 0.6)
for lat, lon, rad, dark in MARIA:
    for k in range(4):
        jl = lat + rng.normal(0, rad * 0.28) if k else lat
        jo = lon + rng.normal(0, rad * 0.32) if k else lon
        rk = rad * (rng.uniform(0.45, 0.75) if k else 0.9)
        c = lonlat_to_vec(jl, jo)
        ang = np.degrees(np.arccos(np.clip(px * c[0] + py * c[1] + pz * c[2], -1, 1)))
        edge = rk * (1 + 0.45 * warp + 0.30 * n_edge)
        m = np.clip((edge - ang) / (rk * 0.55), 0, 1)
        m = m * m * (3 - 2 * m)
        mare = np.maximum(mare, m * dark * (0.85 + 0.15 * rng.uniform()))
# internal tonal variation inside the basins
mare = np.clip(mare * (0.88 + 0.22 * fbm(px, py, pz + 9.0, 4, 6.0)), 0, 1)

n_mott = fbm(px, py, pz, 5, 24.0, 0.55)
albedo = 0.66 - 0.40 * mare
albedo += 0.05 * n_low + 0.05 * n_mid * (1 - mare) + 0.035 * n_mott + 0.02 * n_hi
# Highlands are a touch brighter in the south.
albedo += 0.04 * np.clip(-py, 0, 1) * (1 - mare)

height = np.zeros_like(px)
height += 0.004 * n_mid * (1 - 0.6 * mare)

# ----------------------------------------------------------------- craters
print("craters…")
rays = np.zeros_like(px)


def stamp_crater(lat, lon, rad_deg, depth, fresh, ray_len=0.0):
    c = lonlat_to_vec(lat, lon)
    cx, cy, cz = to_screen(c)
    if cz < -0.05:
        return
    reach = np.radians(rad_deg) * (2.4 if ray_len == 0 else max(2.4, ray_len))
    half = int(min(SIZE, (reach + 0.02) * R)) + 3
    gx = int(SIZE / 2 + cx * R)
    gy = int(SIZE / 2 - cy * R)
    x0, x1 = max(gx - half, 0), min(gx + half, SIZE)
    y0, y1 = max(gy - half, 0), min(gy + half, SIZE)
    if x0 >= x1 or y0 >= y1:
        return
    sl = (slice(y0, y1), slice(x0, x1))
    dot = px[sl] * c[0] + py[sl] * c[1] + pz[sl] * c[2]
    d = np.degrees(np.arccos(np.clip(dot, -1, 1))) / rad_deg
    ins = inside[sl]
    bowl = np.where(d < 1, -depth * np.clip(1 - d * d, 0, 1) ** 0.8, 0)
    rim = depth * 0.45 * np.exp(-((d - 1) / 0.22) ** 2)
    ejecta = depth * 0.18 * np.exp(-np.clip(d - 1, 0, None) / 0.5) * (d > 1)
    h = bowl + rim + ejecta
    if rad_deg > 1.6:
        h += depth * 0.35 * np.exp(-(d / 0.18) ** 2)  # central peak
    height[sl] += np.where(ins, h, 0)
    a = fresh * 0.10 * np.exp(-((d - 1) / 0.35) ** 2) + fresh * 0.04 * (d < 1)
    albedo[sl] += np.where(ins, a, 0)
    if ray_len > 0:
        # radial streaks: angle around the crater centre
        # build a local tangent frame
        up = np.array([0, 1, 0], dtype=np.float32)
        e1 = np.cross(up, c); e1 /= np.linalg.norm(e1)
        e2 = np.cross(c, e1)
        th = np.arctan2(px[sl] * e2[0] + py[sl] * e2[1] + pz[sl] * e2[2],
                        px[sl] * e1[0] + py[sl] * e1[1] + pz[sl] * e1[2])
        streak = np.zeros_like(th)
        for _ in range(70):
            phi = rng.uniform(-np.pi, np.pi)
            width = rng.uniform(0.03, 0.11)
            length = rng.uniform(0.35, 1.0) * ray_len
            dphi = np.angle(np.exp(1j * (th - phi)))
            streak += np.exp(-(dphi / width) ** 2) * np.exp(-d / length) * rng.uniform(0.4, 1.0)
        streak *= np.clip(d - 0.9, 0, 1) * (0.7 + 0.6 * np.clip(n_mott[sl] + 0.5, 0, 1))
        rays[sl] += np.where(ins, streak, 0)


# Random field: power-law size distribution, uniform on the sphere.
for _ in range(5200):
    u = rng.uniform(-1, 1)
    lat = np.degrees(np.arcsin(u))
    lon = rng.uniform(-100, 100)
    rad = 0.12 * (1 - rng.uniform(0, 0.995)) ** -0.55
    rad = min(rad, 6.0)
    age = rng.uniform(0, 1)  # 0 = fresh, 1 = degraded
    depth = 0.006 * rad ** 0.7 * (1.0 - 0.8 * age)
    fresh = (1 - age) ** 5
    stamp_crater(lat, lon, rad, depth, fresh)

# Named, recognisable young craters with ray systems.
stamp_crater(-43.3, -11.2, 1.45, 0.03, 1.0, ray_len=22)   # Tycho
stamp_crater(9.6, -20.0, 1.55, 0.03, 0.8, ray_len=9)     # Copernicus
stamp_crater(8.1, -38.0, 0.55, 0.015, 0.9, ray_len=6)    # Kepler
stamp_crater(23.7, -47.4, 0.6, 0.02, 1.4, ray_len=5)     # Aristarchus (bright)
stamp_crater(-28.4, 3.3, 0.4, 0.01, 0.6, ray_len=0)

albedo += 0.09 * np.clip(rays, 0, 1.5)
albedo = np.clip(albedo, 0.05, 1.0)

# ---------------------------------------------------------------- shading
print("shading…")
height = np.where(inside, height, 0)
gy_, gx_ = np.gradient(height * R)
limb = np.clip((0.995 - rr) / 0.06, 0, 1)
gx_ *= limb
gy_ *= limb
strength = 0.55
nx = sx - gx_ * strength
ny = sy + gy_ * strength
nz = sz.copy()
ln = np.sqrt(nx * nx + ny * ny + nz * nz) + 1e-6
nx, ny, nz = nx / ln, ny / ln, nz / ln

L = np.array([0.42, 0.22, 0.88]); L /= np.linalg.norm(L)
mu0 = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)
mu = np.clip(nz, 1e-3, 1)
lommel = mu0 / (mu0 + mu)
lambert = mu0
shade = 0.55 * lommel * 2 + 0.45 * lambert
shade = np.clip(shade, 0, 1.25)

# soft terminator falloff on the shadowed limb
shade *= np.clip((sx * L[0] + sy * L[1] + sz * L[2] + 0.25) / 0.6, 0, 1) ** 1.2

lum = albedo * shade
lum = 1 - np.exp(-lum * 1.75)
lum = lum ** 1.12  # filmic-ish tone curve
lum = np.clip(lum, 0, 1)

tint = np.array([0.90, 0.93, 0.99])
rgb = np.stack([lum * tint[0], lum * tint[1], lum * tint[2]], axis=-1)
# cool the maria very slightly
rgb[..., 2] += 0.02 * mare * lum
rgb = np.clip(rgb, 0, 1)

alpha = np.clip((1.0 - rr) * R / 1.5, 0, 1)
img = np.dstack([rgb, alpha[..., None]])
img = (img * 255 + 0.5).astype(np.uint8)

from PIL import Image  # noqa: E402

Image.fromarray(img, "RGBA").save(OUT)
print("wrote", OUT)
