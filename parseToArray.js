function grouped(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return '';
	}
}
function checkSome(arr, val) {
  return arr.some(function(item) {
  var rgx = new RegExp(item, "i");
    return rgx.test(val);
  });
}
function checkEvery(arr, val) {
  return arr.every(function(item) {
  var rgx = new RegExp(item, "i");
    return rgx.test(val);
  });
}
function checkSome_2(arr, val) {
  arr.every(function(aa){
    return aa.some(function(item) {
    var rgx = new RegExp(item, "i");
      return rgx.test(val);
    });
  });
}
function returnAndArray(str){
	var andArr1 = [];
	var cleaned = str.replace(/\bAND\b/g, '').replace(/\(.+?\)/g,'').replace(/\s+/g,'","')
var output = '["'+cleaned+'"]';
return JSON.parse(output.replace(/"",/g, ''))
}
function returnOrArray(str){
  var orArr1 = [];
  var orArr2 = [];
  if(/\(.+?\)/.test(str) === true){
  var matches = str.match(/\(.+?\)/g);
    for(i=0; i<matches.length; i++){
  
      var orContents = grouped(/\((.+?)\)/.exec(matches[i].toString()), 1);

      if(/"(.+?)"/.test(orContents) === true){
        var orContentNear = grouped(/"(.+?)"/.exec(orContents), 1).replace(/\s+/g, ".{1,40}\\b").replace(/"/g, '').replace(/\bOR\b/ig, '');   
        var everythingelse = orContents.replace(/".+?"|\bOR\b/ig, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, '_');
        var mergeSudoArr = orContentNear+'_'+everythingelse;
        orArr1.push(JSON.parse('["'+mergeSudoArr.replace(/_/g, '","')+'"]'));
      }else{
        orArr2.push(JSON.parse('["'+orContents.replace(/\bOR\b/ig, '').replace(/\s+/g, '","')+'"]'))
      }
    }
  }
  return orArr1.concat(orArr2);
}  
