pkgname=smtk-obs-overlay-git
pkgver=1.0.0
pkgrel=1
pkgdesc="A lightweight OBS Browser Source overlay for showmethekey using Bun and WebSockets"
arch=('any')
url="https://github.com/denizkose/smtk-obs"
license=('MIT')
depends=('showmethekey' 'bun')
makedepends=('git')
provides=('smtk-obs-overlay')
conflicts=('smtk-obs-overlay')
source=("git+${url}.git")
sha256sums=('SKIP')

pkgver() {
  cd "$srcdir/${pkgname%-git}"
  git describe --long --tags --abbrev=7 2>/dev/null | sed 's/\([^-]*-g\)/r\1/;s/-/./g' ||
  printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
}

package() {
  cd "$srcdir/${pkgname%-git}"
  install -dm755 "$pkgdir/usr/share/smtk-obs-overlay"  
  install -m644 index.ts overlay.html output.css "$pkgdir/usr/share/smtk-obs-overlay/"
  install -Dm755 smtk-obs-server "$pkgdir/usr/bin/smtk-obs-server"
}