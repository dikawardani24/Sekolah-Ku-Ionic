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
     * 
     * @param text 
     */
    public static isEmpty(text: string): boolean {
        return text == undefined || text.length <= 0
    }
}

