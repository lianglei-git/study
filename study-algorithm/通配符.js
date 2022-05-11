/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    let sLength = s.length;
    let pLength = p.length;
    let dp = Array.from(new Array(sLength + 1),() => new Array(pLength+1).fill(false));
    dp[0][0] = true;
    for(var j = 1; j<= pLength;j++){ // 当地一个为空的是否 是否可以匹配
        if(p[j - 1] == '*') {
            dp[0][j] = dp[0][j-1]
        }
    }
    
    for(let i =1;i<=sLength;i++){
        for(let j = 1; j <= pLength;j++){
            if(s[i - 1] == p[j - 1] || p[j - 1] == '?') {
                dp[i][j] = dp[i-1][j-1];
            }else if( p[j - 1] == '*'){
                dp[i][j] = dp[i][j-1] || dp[i-1][j];
            }
        }
    }  

    return dp[sLength][pLength]
};
isMatch('abckng','a?c*hg')