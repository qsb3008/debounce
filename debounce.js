var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    // this指向container元素
    console.log(this)
    // e => Event对象
    console.log(e)
    container.innerHTML = count++;
};

// 第零版：无限制
// function getUserAction(e) {
//     // this指向container元素
//     console.log(this)
//     // e => Event对象
//     console.log(e)
//     container.innerHTML = count++;
// };

// container.onmousemove = getUserAction;

// 第一版
// function getUserAction() {
//     // this指向window
//     console.log(this)
//     container.innerHTML = count++;
// };
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//       clearTimeout(timeout)
//       timeout = setTimeout(func, wait);
//   }
// }
// container.onmousemove = debounce(getUserAction, 600);

// 第二版 改变this指向
// function getUserAction() {
//     console.log(this)
//     container.innerHTML = count++;
// };
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//       clearTimeout(timeout)
//       timeout = setTimeout(func.bind(this), wait);
//   }
// }
// container.onmousemove = debounce(getUserAction, 600);

// function getUserAction(e) {
//   console.log(this)
//   console.log(e)
//   container.innerHTML = count++;
// };
// function debounce(func, wait) {
// var timeout;
// return function () {
//     var ctx = this
//     clearTimeout(timeout)
//     timeout = setTimeout(function () {
//       func.apply(ctx)
//     }, wait);
// }
// }
// container.onmousemove = debounce(getUserAction, 600);

// 第三版 修正event对象
// function getUserAction(e) {
//   console.log(this)
//   console.log(e)
//   container.innerHTML = count++;
// };
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//       var ctx = this
//       var args = arguments
//       clearTimeout(timeout)
//       timeout = setTimeout(function () {
//         func.apply(ctx, args)
//       }, wait);
//   }
// }
// container.onmousemove = debounce(getUserAction, 600);

// 第四版 立即执行
// function debounce(func, wait, immediate) {

//   var timeout;

//   return function () {
//       var context = this;
//       var args = arguments;

//       if (timeout) clearTimeout(timeout);
//       if (immediate) {
//           // 如果已经执行过，不再执行
//           var callNow = !timeout;
//           timeout = setTimeout(function(){
//               // 一次完整操作介绍，timeout设为null下一次才能正常运行 
//               timeout = null;
//           }, wait)
//           // 在开始执行，末尾不执行
//           if (callNow) func.apply(context, args)
//       }
//       else {
//           timeout = setTimeout(function(){
//               func.apply(context, args)
//           }, wait);
//       }
//   }
// }
// container.onmousemove = debounce(getUserAction, 600, true);

// 第五版 返回值
// function debounce(func, wait, immediate) {

//     var timeout, result;

//     return function () {
//         var context = this;
//         var args = arguments;

//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             // 如果已经执行过，不再执行
//             var callNow = !timeout;
//             timeout = setTimeout(function(){
//                 timeout = null;
//             }, wait)
//             if (callNow) result = func.apply(context, args)
//         }
//         else {
//             timeout = setTimeout(function(){
//                 func.apply(context, args)
//             }, wait);
//         }
//         return result;
//     }
// }

// container.onmousemove = debounce(getUserAction, 600, true);

// 第六版 取消功能
function debounce(func, wait, immediate) {

  var timeout, result;

  var debounced = function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) result = func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
      return result;
  };

  debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
  };

  return debounced;
}

var setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})
