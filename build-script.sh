REGISTRY=jvailionis-testapp
VERSION=0.1.0

docker buildx build \
  --build-arg APP_VERSION=$VERSION \
  --build-arg GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo none) \
  -t my-app:$VERSION \
  -t my-app:latest \
  --load \
  .
