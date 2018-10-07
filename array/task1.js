'use strict'

const cars = require('./data/cars'); 
const customers = require('./data/customers'); 
const dealerships = require('./data/dealerships'); 
const orders = require('./data/orders'); 

// Array's task

// Method's signature is immutable and cannot be changed.
// Defaults should be implemented.

// TASK #1

/**
 *  SUBTASK #1
 * 
 * This is a Grouping logic. In this example it means that * - unique field and ** - an array of unique values.
 * 
 * Should return an array with the next structure: 
 * [
 *      {
 *          dealershipId: number, // *
 *          name: string,
 *          state: string,
 *          cars: [
 *              {
 *                  make: string, // *
 *                  models: [
 *                      {
 *                          model: string, // *
 *                          displayNames: [string, ...] // **
 *                      }, ...
 *                  ]
 *              }, ...
 *          ]
 *      }, ...
 * ]
 * @returns {Array}
 */

function newUniqueArray (array, key1, key2, value) {

    let tempArray = []; 
    let j=0;

    for (let i=0; i<array.length; i++) {
         if (array[i][key1] == value) {
            tempArray[j] = array[i][key2];
            j++;
        }

        
    };

    let uniqueArray = [...new Set(tempArray)];
    return uniqueArray;
};

const subtask1 = () => {
    
    return dealerships.reduce((itemsdealer, currentdealer) => {
            
            let obj = {};
            obj.dealershipId = currentdealer.dealershipId;
            obj.name = currentdealer.name;
            obj.state = currentdealer.state;

            let listcarsofdealer = [], 
                listcarsmake = [],
                j = 0;

            for (let i = 0; i<cars.length; i++) {
                if (cars[i].dealershipId == currentdealer.dealershipId) {
                    listcarsofdealer[j] = cars[i];
                    listcarsmake[j]=cars[i].make;
                    j++;
                }

            };
            
            let uniqueListcarsmake = [...new Set(listcarsmake)];
     
            obj.cars =  uniqueListcarsmake.reduce((itemsMake, currentMake) => {

                let obj = {};
                
                obj.make = currentMake;

                let m = listcarsofdealer.reduce((array, item) => {
                    if (item.make == currentMake) {
                        array.push (item.model);
                        };
                        return array;
                 }, []);

                let uniqueM = [...new Set(m)];
          
                obj.models = uniqueM.reduce((itemsModel, currentModel) => {
                            
                        let objmodel = {};
                                            
                        objmodel.model = currentModel; 
                                 
                        objmodel.displayNames = listcarsofdealer.
                            filter ((el) => {
                                if (el.make == currentMake) {
                                    return el;
                                }
                            }).
                            reduce ((array, item) => {
                                    if (item.model==currentModel) {
                                        array.push (item.displayName);
                                    };
                                    return array;
                                }, []);
                                
                            itemsModel.push(objmodel); 
                            return itemsModel;
                            }, 
                         []);

                    itemsMake.push(obj); 
                    return itemsMake;
            }, 
        []);
    
    itemsdealer.push(obj); 
    return itemsdealer;

        }, 
    []);

}; 

/**
 *  SUBTASK #2
 * 
 * Should return an array with the next structure: 
 * [
 *      {
 *          dealershipId: number, // *
 *          name: string,
 *          state: string,
 *          sellingArea: [
 *              {
 *                  state: string, // *
 *                  customerIds: [string, ...] // **
 *              }, ...
 *          ]
 *      }, ...
 * ]
 * 
 * @returns {Array}
 */
const subtask2 = () => {

    return dealerships.reduce((itemsdealer, currentdealer) => {
            
            let obj = {};
            obj.dealershipId = currentdealer.dealershipId;
            obj.name = currentdealer.name;
            obj.state = currentdealer.state;


            let carIds = newUniqueArray (cars, 'dealershipId', 'id', currentdealer.dealershipId);
            let customerIds = orders.reduce((itemsOrder, currentOrder) => {

                for (let i=0; i<carIds.length; i++) {
                        if (currentOrder.inventoryId == carIds[i]) {
                              itemsOrder.push(currentOrder.customerId);    
                        }
                     };
                     return [...new Set(itemsOrder)];
                
                }, []);

            obj.sellingArea = currentdealer.sellingArea.reduce((itemsArea, currentArea) => {

                let obj = {};
                obj.state = currentArea;
  
                obj.customerIds = customerIds.filter((item) => {
                
                for (let i=0; i<customers.length; i++) {
                  if (item == customers[i].id && 
                    customers[i].address.state == currentArea) {
                    return item; 
                    }
                }
                });
                        
                    itemsArea.push(obj); 
                    return itemsArea;
            }, 
        []);
    
        itemsdealer.push(obj); 
        return itemsdealer;

}, 
[]); 

};

/**
*  SUBTASK #3
* 
* Should return an array with the next structure: 
* [
*      {
*          dealershipId: number, // *
*          name: string,
*          state: string,
*          carIds: [string, ...] <--- cars should be sorted by fields in the next priority : [make -> model -> displayName] (all ASC) 
*      }, ...
* ]
* 
* @returns {Array}
*/

function dynamicSort(property) {
    
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a,b) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {

    let arg = arguments;
    return function (obj1, obj2) {
        let i = 0, result = 0, numberOfProperties = arg.length;

        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(arg[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

const subtask3 = () => {

   
    return dealerships.reduce((itemsdealer, currentdealer) => {
            
            let obj = {};
            obj.dealershipId = currentdealer.dealershipId;
            obj.name = currentdealer.name;
            obj.state = currentdealer.state;
            let d = cars.filter((item) => 
        { if (item.dealershipId == currentdealer.dealershipId) {
            return item;
                }
          
            }).sort(dynamicSortMultiple("make", "model", "displayName"));
            
        obj.carsId = d.reduce ((array, item) => {
                    array.push(item.id);
                    return array;
                },
                []);

            obj.lengthofcarsid = d.length;  
    
            itemsdealer.push(obj); 
            return itemsdealer;
                }, 
        []);
    }; 

/**
 * SUBTASK #4
 * 
 * @param {Array} list an array from subtask #3
 * @returns {Array} sorted array from subtask #3 by the next prio of fields : [state -> count of carIds] (ASC -> DESC)
 */
const subtask4 = (list) => {
    
    return list.sort(dynamicSortMultiple("state", "-lengthofcarsid"));
}


/**
 * SUBTASK #5
 * 
 * @param {number} minId [default = 100000]
 * @param {number} maxId [default = 100200]
 * @param {boolean} isReversed if set to true then reverse task logic (IN -> NOT IN)
 * @returns {Array} the same result as in subtask #3 but this logic should work only with those dealership whose dealershipId IN (NOT IN) [minId, maxId]
 */
const subtask5 = (minId=100000, maxId=100200, isReversed=true) => {
        

    return dealerships.filter((item) => {
        if (item.dealershipId > minId && item.dealershipId < maxId) {
            return item
            }
            }).
    reduce((itemsdealer, currentdealer) => {
    
                
        let obj = {};
            obj.dealershipId = currentdealer.dealershipId;
            obj.name = currentdealer.name;
            obj.state = currentdealer.state;
            let d = cars.filter((item) => 
        { if (item.dealershipId == currentdealer.dealershipId) {
            return item;
                }
          
            }).sort(dynamicSortMultiple("make", "model", "displayName"));
            
        obj.carsId = d.reduce ((array, item) => {
                    array.push(item.id);
                    return array;
                },
                []);

            obj.lengthofcarsid = d.length;
        obj.isReversed = isReversed;    
            itemsdealer.push(obj); 
            return itemsdealer;
              
    }, 
     
        []);
    }; 



/**
 * Should return all dealerships (new list) who has enough cars (dealership.carIds > minCarsCount).
 * 
 * @param {Array} list 
 * @param {number} minCarsCount [default = 100]
 * @returns {Array} filtered dealersips 
 */
const subtask6 = (list, minCarsCount) => {

    minCarsCount = minCarsCount || 100;
    let array = list.filter ((item)=>{
        return item.lengthofcarsid > minCarsCount;
    });
    return array;
}

console.time('subtask #1')
const result1 = subtask1()
console.timeEnd('subtask #1')
console.log('subtask #1 result: ', JSON.stringify(result1[0], null, 5), JSON.stringify(result1[result1.length - 1], null, 5))

console.time('subtask #2')
const result2 = subtask2()
console.timeEnd('subtask #2')
console.log('subtask #2 result: ', JSON.stringify(result2[0], null, 2), JSON.stringify(result2[result2.length - 1], null, 2))

console.time('subtask #3')
const result3 = subtask3()
console.timeEnd('subtask #3')
console.log('subtask #3 result: ', JSON.stringify(result3[0], null, 2), JSON.stringify(result3[result3.length - 1], null, 2))

console.time('subtask #4')
const result4 = subtask4(result3)
console.timeEnd('subtask #4')
console.log('subtask #4 result: ', JSON.stringify(result4[0], null, 2), JSON.stringify(result4[result4.length - 1], null, 2))

console.time('subtask #5')
const result5 = subtask5();
console.timeEnd('subtask #5')
console.log('subtask #5 result: ', JSON.stringify(result5[0], null, 2), JSON.stringify(result5[result5.length - 1], null, 2))

console.time('subtask #6')
const result6 = subtask6(result3)
console.timeEnd('subtask #6')
console.log('subtask #6 result: ', JSON.stringify(result6[0], null, 2), JSON.stringify(result6[result6.length - 1], null, 2))
module.exports = {
    subtask1,
    subtask2,
    subtask3,
    subtask4,
    subtask5,
    subtask6
}