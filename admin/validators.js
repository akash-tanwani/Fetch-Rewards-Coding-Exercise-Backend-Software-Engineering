const isEmpty = (string) => {
    return (string.trim()==='') 
};

exports.validateAddPoints = (user,data) =>{
    let errors = {}
    if(isEmpty(user)){
        errors.userName='Must not be empty';
    }

    if(isEmpty(data.payer)){
        errors.payer='Must not be empty';
    }

    if(data.points==0){
        errors.points='Must not be empty';
    }

    if(isEmpty(data.timeStamp)){
        errors.timeStamp='Must not be empty';
    }

    return{
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

