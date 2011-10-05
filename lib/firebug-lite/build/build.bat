rd firebug-lite /s /q 
rd pub /s /q 

svn export "../" "./firebug-lite"

md pub
xcopy ".\firebug-lite\skin\." ".\pub\skin" /s /i
copy "..\docs\beta\index.html" ".\pub\index.html"
copy "..\content\changelog.txt" ".\pub"
copy ".\firebug-lite\build\*.*" ".\pub"
del ".\pub\*.bat"

tar -cv --file=firebug-lite.tar firebug-lite/*
gzip -9 < firebug-lite.tar > ./pub/firebug-lite.tar.tgz

del firebug-lite.tar

rd firebug-lite /s /q 

pause

