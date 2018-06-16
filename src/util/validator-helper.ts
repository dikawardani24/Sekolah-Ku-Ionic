export class PersonValidatorsHelper {
    /**
    * This function is to check wheter the given text is contain one character from 
    * forbidden collection of character
    * @param text to check
    * @param forbiddenChars the forbidden chars collection to be matched 
    */
    public static isContainForbiddenChar(text: string, forbiddenChars: string): boolean {

        if (text == undefined) return true

        for (var i = 0; i < text.length; i++) {
            for (var j = 0; j < forbiddenChars.length; j++) {
                var char = text.substr(i, 1)

                if (char == forbiddenChars[j]) {
                    return true
                }
            }
        }

        return false
    }

    /**
     * This function is being use for checking whether a text only contain 
     * number or otherwise.
     * @param text the text to be checked
     */
    public static isOnlyContainNumber(text: string) {
        const forbiddenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=|\/[]?><`~\'\'""'
        return !this.isContainForbiddenChar(text, forbiddenChars)
    }

    /**
     * 
     * @param name 
     */
    public static isNameValid(name: string) {
        const forbiddenChars = '!@#$%^&*()_+=|\/[]?><`~\'\'""1234567890'

        return !this.isContainForbiddenChar(name, forbiddenChars)
    }

    /**
     * 
     * @param email 
     */
    public static isEmailValid(email: string): boolean {
        var valid = false
        for (var i = 0; i < email.length; i++) {
          var char = email.substr(i, 1)
    
          if (char == '@') {
            valid = true
            break
          }
        }

        return valid
    }
}