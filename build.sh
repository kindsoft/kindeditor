echo "Building kindeditor..."
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -v ./src/lang/zh_CN.js > ./build/kindeditor.js
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -v ./src/kindeditor-core.js >> ./build/kindeditor.js
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -v ./src/plugin-all.js >> ./build/kindeditor.js
if [ -d ./build/plugins ]; then
echo ""
else
mkdir ./build/plugins
fi
if [ -d ./build/plugins/emoticons ]; then
echo ""
else
mkdir ./build/plugins/emoticons
fi
if [ -d ./build/skins ]; then
echo ""
else
mkdir ./build/skins
fi
cp -f ./src/plugins/*.html ./build/plugins/
cp -f ./src/plugins/emoticons/*.gif ./build/plugins/emoticons/
cp -f ./src/skins/*.gif ./build/skins/
cp -f ./src/skins/*.css ./build/skins/
echo ""
echo "Build done."
echo ""