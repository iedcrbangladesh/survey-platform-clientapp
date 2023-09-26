import DIS_LOGIC from '@/app/json/disablelogic.json';
import SKIP_LOGIC from '@/app/json/skiplogic.json';

const disable_logic=(name:string,value:any, setFieldValue:any,logic_option:any):any=>{

        const dis_logic_array:any = DIS_LOGIC

        //console.log(name);
        if(dis_logic_array.hasOwnProperty(name)){

            var ds_logic_array = dis_logic_array[name];

            for (let i = 0; i < ds_logic_array.length; i++) {
                var element = ds_logic_array[i];
                //console.log(element[logic_option]);
                var first_key = Object.keys(ds_logic_array[i])[0];

                var found_key = logic_option.find((search:string)=>{
                    return search == first_key;
                });
                //console.log(found_key)

                if(found_key == "not"){
                    var not = element[found_key];     
                    var fields = element["fields"];       
                    var found = not.find((search:string)=>{
                        return search == value? search:null;
                    });
                    //console.log(found); 
                    found_disabled(found,fields,setFieldValue);
                    break;
                }

                if(found_key == "range"){
                    var gt_lt = element[found_key];
                    var fields = element["fields"];       
                    //console.log(gt_lt[0],gt_lt[1]);
                    if(value >= gt_lt[0] && value <=gt_lt[1]){
                        found_disabled(undefined, fields,setFieldValue);
                        //console.log(value,gt_lt);
                        break;
                    }                    
                                        
                }

                if(found_key == "lt"){
                    var lt = element[found_key];
                    var fields = element["fields"];
                    if(value < lt){
                        found_disabled(undefined, fields,setFieldValue);
                    }
                    break;
                }

                if(found_key == "gt"){
                    var gt = element[found_key];
                    var fields = element["fields"];
                    if(value > gt){
                        found_disabled(undefined, fields,setFieldValue);
                    }
                    break;
                }

            }
            
            
            
            
        }
}

function found_disabled(found:any, fields:any, setFieldValue:any){
    if( typeof found != 'undefined'){                
            
        for(const [key, value] of Object.entries(fields)){
            //console.log(key, value);
            setFieldValue(key,value);
        }
    }
}

const skip_logic=(name:string,value:any, logic_option:string):any=>{
    const skip_logic_array:any = SKIP_LOGIC
    let redirect_element = {"redirect":"","focusElement":""}
    if(skip_logic_array.hasOwnProperty(name)){
        //console.log(name)
        var sl_logic_array = skip_logic_array[name];
        //var first_key = sl_logic_array[logic_option];
        var found_key = logic_option;

        if(found_key == "is"){
            var is = sl_logic_array[found_key]['value'];     
            var found = is.find((search:string)=>{                
                return search == value;
            });
            if(typeof found !='undefined'){                
                return {"redirect":sl_logic_array[found_key]["route"],"focusElement":sl_logic_array[found_key]["node"]}                
            }else if(is[0] < 0){                
                return {"redirect":sl_logic_array[found_key]["route"],"focusElement":sl_logic_array[found_key]["node"]}
            }            
        }

        if(found_key == "lt"){
            
            var lt = sl_logic_array[found_key]['values'];
            if(value < lt){
                //alert(sl_logic_array[found_key]["route"])

                return {"redirect":sl_logic_array[found_key]["route"],"focusElement":sl_logic_array[found_key]["node"]}
            }
            
        }

        if(found_key == "gt"){
            
            var gt = sl_logic_array[found_key]['values'];
            if(value > gt){
                return {"redirect":sl_logic_array[found_key]["route"],"focusElement":sl_logic_array[found_key]["node"]}
            }
            
        }

        //console.log(sl_logic_array)
        

        return redirect_element;

    }

    return redirect_element

}


export {
    disable_logic,
    skip_logic
}