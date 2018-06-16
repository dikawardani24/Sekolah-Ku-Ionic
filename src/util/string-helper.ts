/**
 * @author dikawardani24@gmail.com
 */
export class StringHelper {
    /**
     * This function is used to split data collections into
     * string. The separator between datas is using the specified separator
     * on parameter.
     * @author dikawardani24@gmail.com
     * @param separator the separator between data collections
     * @param collections the data collections to be splitted
     */
    public static join(separator: string, collections: Array<any>): string {
        var result = ""

        if (separator == undefined || separator.length == 0) {
            return result
        }

        if (collections.length == 0) {
            return result
        }

        var lastIndex = collections.length - 1

        for (var i = 0; i < lastIndex; i++) {
            result += collections[i] + separator

        }
        result += collections[lastIndex]

        return result
    }

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
     * @param text 
     */
    public static isEmpty(text: string): boolean {
        return text == undefined || text.length <= 0
    }
}

