emcc -Oz -o fibonacci.js -s EXPORTED_FUNCTIONS='["_fibonacci"]' main.cc
http-server -o index.html