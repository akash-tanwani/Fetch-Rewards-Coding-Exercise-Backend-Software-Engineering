//const { timeStamp } = require("console");
//const { response } = require("express");

const { validateAddPoints } = require("../admin/validators");
const { showUSerDetail } = require("../displayContent/display");
const userData = new Map()

//Add Points
exports.addPoints=(request, response) =>{
    const userName = request.body.user

    const transaction = {
        payer:request.body.payer,
        points:request.body.points,
        timeStamp:request.body.timeStamp
    }
    const {valid, errors} = validateAddPoints(userName, transaction);

    if(!valid) return response.status(400).json(errors);
   
    if(userData.has(userName)){
        const user=userData.get(userName)
        let addedPoints=transaction.points

        if(addedPoints<0){
            if(user.payerInfo.has(transaction.payer) && (user.payerInfo.get(transaction.payer)+addedPoints)>=0){
                user.payerInfo.set(transaction.payer,user.payerInfo.get(transaction.payer)+addedPoints)
                //traverse tList to deduct points
                let i=0
                while(addedPoints!=0){
                    let temp=user.tList[i]
                    if (temp.payer===transaction.payer){
                        if(temp.points> (addedPoints*(-1))){
                            user.tList[i].points+=addedPoints
                            addedPoints=0
                        }
                        else{
                            addedPoints+=temp.points
                            user.tList.splice(i,1)
                        }
                    }
                    else{
                        i+=1
                    }
                }
                user.tList.sort(function (a, b) {
                    return Date.parse(a.timeStamp) - Date.parse(b.timeStamp)
                });

                showUSerDetail(user)
                response.status(200).json({code:"SUCCESS",description:"Points Added Successfully"});
            }
            else{
                response.status(404).json({code:"INSUFFICIENT POINTS"});
            }
        }
        else{
            if(user.payerInfo.has(transaction.payer)){
                user.payerInfo.set(transaction.payer,user.payerInfo.get(transaction.payer)+transaction.points)
            }
            else{
                user.payerInfo.set(transaction.payer, transaction.points)
            }
            user.tList.push(transaction)
            user.tList.sort(function (a, b) {
                return Date.parse(a.timeStamp) - Date.parse(b.timeStamp)
            });
            showUSerDetail(user)
            response.status(200).json({code:"SUCCESS",description:"Points Added Successfully"});
        } 
    }
    else{
        if(transaction.points<0){
            response.status(400).json({code:"INSUFFICIENT POINTS"});
        }
        else{
        const tList = [transaction];
        let payerDetails = new Map()
 
        payerDetails.set(transaction.payer,transaction.points)

        userData.set(userName,{tList: tList, payerInfo : payerDetails })

        showUSerDetail(userData.get(userName))
        response.status(200).json({code:"SUCCESS",description:"Points Added Successfully"});
        }
    }
};
