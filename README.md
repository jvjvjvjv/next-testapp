# jvailionis-flux-test-app

A minimal Next.js app used to test [Flux](https://fluxcd.io/) image update
automation on a Kubernetes cluster. Displays its own version prominently,
with a background color derived from the version string so updates are
visually obvious.

## Stack

- Next.js 14 (App Router, standalone output)
- Multi-arch Docker image (`linux/amd64`, `linux/arm64`)
- Built and pushed via GitHub Actions to GHCR
- Consumed by Flux `ImageRepository` + `ImagePolicy` + `ImageUpdateAutomation`

## Image

Published to:

```
ghcr.io/jvjvjvjv/next-testapp
```

Builds are triggered only when pushing a git tag `vX.Y.Z`  
Tags produced:

- `X.Y.Z` — full semver, from git tag `vX.Y.Z`
- `X.Y` — minor version
- `main`
- `latest`
- `sha-<short>` — commit SHA

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Local Docker build (single arch)

```bash
docker buildx build \
  --build-arg APP_VERSION=0.1.0 \
  --build-arg GIT_SHA=$(git rev-parse --short HEAD) \
  -t flux-test-app:0.1.0 \
  --load .

docker run --rm -p 3000:3000 flux-test-app:0.1.0
```

## Release workflow — how to ship a new version

The GitHub Actions workflow (`.github/workflows/build.yml`) builds and
pushes a multi-arch image on every push to `main` and on every `v*.*.*`
tag. 

### Step-by-step: bump and release

1. **Bump the version in `package.json`**

   ```bash
   npm version patch --no-git-tag-version   # 0.1.0 -> 0.1.1
   # or: npm version minor --no-git-tag-version
   # or: npm version major --no-git-tag-version
   ```

   `--no-git-tag-version` stops npm from auto-tagging, so we can commit
   first and tag deliberately.

2. **Commit the version bump**

   ```bash
   git add package.json package-lock.json
   git commit -m "bump to v0.1.1"
   ```

3. **Tag the commit and push both**

   ```bash
   git tag v0.1.1
   git push origin main --tags
   ```

4. **Watch the workflow build** at
   `https://github.com/jvjvjvjv/next-testapp/actions`.
   Multi-arch builds take ~5–10 minutes (arm64 runs under QEMU emulation).

## Files

- `app/page.tsx` — the version display page
- `next.config.js` — reads `APP_VERSION`, `GIT_SHA`, `BUILD_TIME` env vars
- `Dockerfile` — multi-stage build using Next.js standalone output
- `.github/workflows/build.yml` — CI build + push to GHCR
