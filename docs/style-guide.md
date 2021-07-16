## Inline documentation style guide
Try to loosely follow the guide below. Feel free to add your own styles on top of it (as I have), but please try to have it look relatively the same to the current documentation


#### Notations
<>xxxx<> - description of what should go after this line, omit in documentation  
@xxxxx - Javadoc style annotation

#### Styles
/**  - multiline comment, use this style for documentation
 *
 *
*/

#### Annotations
<>Summary<> - a short one line summary of the code block
<>Description<> - a longer description of the codeblock

@since x.x.x - 3-digit initial introduction if significant changes are made. Serves as a change log. Only use for important and general code blocks such as classes. 

@see - a function or class relied on

@return - summary of what the function returns

@memberof - namespace that this function is contained within if JSDoc is unable to respove this automatically

@link - url that provices more information, try to keep these short

@listens - events this functions listen for.

@access - implicit access modifer of method [public, private, protected]


### Example

#### Class and method

```
/**
 * <>Summary<> Processes an order  
 *
 * <>Description<> Implements all functionallity of processing an order. It takes care of checking if a class is already booked and all error handling
 *
 * @since 2.0.0
 * @link https://processorder.com
 * @see {ProcessPayment}
 *
*/
class ProcessOrder extends ProcessPayment {

    /**
     * <>Summary<> calcuate total order price
     * 
     * <>Description<> uses complex math such as machine learning to gain 99% accurate order cost predictions
     *
     * @access private
     * @memberof {ProcessOrder}
     *
     * @param {Integer} costOne - the first cost
     * @param {Integer} costTwo - the second cost
     * @returns {Integer} - the new total cost
    */
    _calculateCost(costOne, costTwo){
        ...
        return totalCost
    }
}
```

### Inline docs conclusion
Feel free to use more annotations if you feel they are necessary. Remeber to only document your code if it is not self explanitory, try to make your code read like a book, the less documentation the better. In my opinion, if the tools provided above are used effectively, it will give readers enough insight into what the code block is doing, so if you can, try to limit yourself to those.
