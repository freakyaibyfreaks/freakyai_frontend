/* Avaialble Source languages */
export const sourceLanguages = [
    'C++',
    'JAVA', 
    'Python'
]

/* Available target languages */
export const targetLanguages = [
    'C++',
    'JAVA',
    'Python'
]

/* Sample JAVA code */
export const sampleJAVACode = `
    static boolean checkDivisibility (String num) {
        int length = num.length();
        
        if(length == 1 && num.charAt(0) =='0') 
            return true;
        
        if(length % 3 == 1) {
            num += "00";
            length += 2;
        } else if(length % 3 == 2) {
            num += "0";
            length += 1;
        } 
        
        int sum = 0, p = 1;
        
        for(int i = length - 1; i >= 0; i--) {
            int group = 0;
            group += num.charAt(i--) -'0';
            group += (num.charAt(i--) -'0') * 10;
            group += (num.charAt(i) -'0') * 100;
            sum = sum + group * p;
            p *= (-1);
        }
        sum = Math.abs(sum);
        return (sum % 13 == 0);
    }
`

/* Sample Python code */
export const samplePythonCode = `
    def checkDivisibility(num):
        length = len(num)
        
        if(length == 1 and num[0] =='0'):
            return True
        
        if(length % 3 == 1):
            num = str(num) + "00"
            length += 2
        
        elif(length % 3 == 2):
            num = str(num) + "0"
            length += 1
            sum = 0
            p = 1
        
        for i in range(length - 1, -1, -1):
            group = 0
            group += ord(num[i]) - ord('0')
            i -= 1
            group += (ord(num[i]) - ord('0')) * 10
            i -= 1
            group += (ord(num[i]) - ord('0')) * 100
            sum = sum + group * p
            p *= (-1)
        sum = abs(sum)
        return (sum % 13 == 0)
`

/* Sample C++ code */
export const sampleC_plus_plus_code = `
    bool checkDivisibility (string num) {
        int length = num.size();
        
        if(length == 1 && num[0] =='0')
            return true;
        if(length % 3 == 1) {
            num += "00";
            length += 2;
        } else if(length % 3 == 2) {
            num +='0';
            length += 1;
        }
        int sum = 0, p = 1;
        
        for(int i = length - 1;i >= 0; i--) {
            int group = 0;
            group += num[i--] -'0';
            group += (num[i--] -'0') * 10;group += (num[i] -'0') * 100;
            sum = sum + group * p;
            p *= (-1);
        }
        sum = abs(sum);
        return (sum % 13 == 0);
    }
`
