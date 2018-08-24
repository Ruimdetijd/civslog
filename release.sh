# rm -rf node_modules
# npm i
# npm run build
# npm run dist
read -p "\n\nDid you bump the version? "
next_version=$(node -pe 'require("./package.json").version')
read -p "Bump the version to $next_version? " anwser
echo "\n\n"

if [ $anwser == "y" ]; then
	git add .
	git commit -m "Bump to v$next_version"
	git tag $next_version
	git push && git push --tags
fi