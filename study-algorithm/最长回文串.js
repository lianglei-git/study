function longestPalindrome(s) {
    let dp = Array.from(new Array(s.length), () => new Array(s.length).fill(false))
    for (var i = 0; i < s.length; i++) {
        dp[i][i] = true;
    }
    let start = 0;
    let end = 0;
    for (var j = 1; j < s.length; j++) {
        for (var i = 0; i < j; i++) {
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 3) {
                    dp[i][j] = true;    
                } else {
                    dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1];
                }
            }
            if (dp[i][j] && j - i + 1 > end) {
                start = i;
                end = j - i + 1;
            }
        }
    }
    console.log(s.slice(start, start + end))
}

longestPalindrome('avnfkskfnl')