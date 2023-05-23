/*module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};*/

/*module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];

  return {
    presets,
  };
};*/

module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];

  return {
    presets,
    plugins: ['transform-es2015-modules-commonjs'],
  };
};

/*module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};*/
