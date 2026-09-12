#!/data/data/com.termux/files/usr/bin/bash
set -e
REPO="${1:-https://github.com/Ara2026fat/bu3d-printer.git}"
cd "$(dirname "$0")"
command -v git >/dev/null || pkg install -y git
git init -q -b main 2>/dev/null || true
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO"
git config user.email "bu3d@local"; git config user.name "bu3d"
git add -A
git commit -q -m "bu3d app $(date +%Y-%m-%d_%H:%M)" || echo ":: لا يوجد جديد"
echo ":: اكتب اسم حسابك ثم التوكن ككلمة مرور"
git push -f origin main
echo ":: تم ✓  فعّل Pages مرة واحدة: Settings ← Pages ← main / (root)"
