export const InputElement = (props)=>{
    return (<>
          <div className=" flex flex-col gap-1 items-start self-stretch max-w-xs">
            <p className="text-base">{props.lable}</p>
            <input
              type="text"
              placeholder="lastname"
              className="border-2 border-solid hover:border-blue-600 focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors "
            /> 
          </div>
    </>)
}