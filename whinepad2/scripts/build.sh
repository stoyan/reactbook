# QA
eslint js/source js/__tests__
flow
npm test
# js transform
babel js/source/ -d js/build
# js package
browserify js/build/app.js -o bundle.js
browserify js/build/discover.js -o discover-bundle.js
# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# done
date; echo;

