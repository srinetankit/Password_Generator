import React, {useState, useRef, useEffect, useCallback, } from "react";
 

const PasswordGenerator = () => {
    const copyIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>;
    const refreshIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path stroklinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
;
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(10);
    const [character, setCharacter] = useState(false);
    const [number, setNumber] = useState(false);
    const [uppercase, setUppercase] = useState(false); 
    const [copyMessage, setCopyMessage] = useState(false);
    const pwdRef = useRef();
    

    
    const generate = useCallback(() => {
        let str = 'poiuytrewqlkhjgfsdamnvbcxz';
        if(character) str += '!@#$%&?';
        if(number) str += '1234567890';
        if(uppercase) str += 'POUIYTERWQMNZXBVCLKASJHDFG';
        let pwd = '';
        for(let i=0; i<length; i++){
            let currChar = Math.floor(Math.random() * str.length + 1);
            pwd += str.charAt(currChar);
        }
        setPassword(pwd)
        // console.log(password);
    }, [length, character, number, uppercase, setPassword])


    useEffect(() => {
        generate();
    }, [length, number, character, uppercase, setLength]);

    const copyPassword = useCallback(() => {
        pwdRef.current?.select();
        window.navigator.clipboard.writeText(password)
        setCopyMessage(true);
        setTimeout(() => {
            setCopyMessage(false);
            pwdRef
        }, 1000);
    }, [password]);


    return(
        <>
            <title>Password Generator</title>

            <main>
                <div className="w-full h-screen flex justify-center items-center bg-black opacity-90 relative font-mono text-black" id="container"> 
                    <div className="w-full sm:w-[550px] border-2 p-7 rounded-3xl mask-b-to-green-600 bg-white absolute z-10 " id="card">
                        
                        <div className="w-full h-full" >
                            <h1 className="text-center text-3xl font-bold">Password Generator</h1>

                            <div className="flex justify-center items-center relative">
                                <input
                                    type="text"
                                    placeholder="password"
                                    value={password}
                                    ref={pwdRef}
                                    readOnly
                                    className="w-full bg-blue-100 pl-6 py-3 text-[22px] text-orange-700 placeholder:text-gray-400 rounded-3xl font-normal my-7 relative top-0 focus:outline-0"
                                    />

                                <span id="refIcon" className='absolute right-15 top-11 z-10 text-blue-700 cursor-pointer' onClick={() => generate()}>
                                    {refreshIcon}
                                    <span id="refMsg" className='absolute right-[-10px] top-[-17px] text-[14px] z-10 text-blue-400 invisible'>
                                        Refresh
                                    </span>
                                </span>

                                <span id="copyIcon" className='absolute right-5 top-11 z-10 text-blue-700 cursor-pointer' onClick={copyPassword}>
                                    {copyIcon}
                                    <span id="copyMsg" className='absolute right-[-1px] top-[-18px] text-[14px] z-10 text-blue-400 invisible'>
                                        Copy
                                    </span>
                                </span>

                                <span className='absolute right-5 top-0 z-10 text-blue-700 cursor-pointer' onClick={copyPassword}>
                                    {copyMessage == true ? 'Copied!' : ''}
                                    
                                </span>
                            </div>

                            <div className="">
                                {/* <h2 className="text-center text-2xl font-bold">Include</h2>
                                <div className="h-0.5 w-28 bg-black rounded-full m-auto"></div> */}
                                <div className="flex justify-evenly text-black my-7">
                                    <span className="flex justify-start items-center gap-2 text-[20px] w-1/2">
                                        <input
                                        
                                            type="range" 
                                            min={6} 
                                            max={50} 
                                            defaultValue={length}
                                            id="len"
                                            onChange={(e) => setLength(e.target.value)} 
                                            className="accent"
                                        />
                                        <label htmlFor="len">{length} <span className="hidden sm:inline">Length</span></label>
                                    </span>
                                    <span className="flex justify-center items-center gap-2 text-[20px] w-1/2">
                                        <input
                                            type="checkbox" 
                                            defaultChecked={character} 
                                            id="char"
                                            onChange={() => setCharacter((prev) => !prev)} 
                                            className="accent"
                                        />
                                        <label htmlFor="char">Character</label>
                                    </span>
                                </div>
                                <div className="flex justify-evenly text-black my-5">
                                    <span className="flex justify-start items-center gap-2 text-[20px] w-1/2 pr-[56px]">
                                        <input
                                            type="checkbox" 
                                            defaultChecked={number} 
                                            id="num"
                                            onChange={() => setNumber((prev) => !prev)} 
                                            className="accent"
                                        />
                                        <label htmlFor="num">Number</label>
                                    </span>
                                    <span className="flex justify-center items-center gap-2 text-[20px] w-1/2">
                                        <input
                                            type="checkbox" 
                                            defaultChecked={uppercase} 
                                            id="upper"
                                            onChange={() => setUppercase((prev) => !prev)} 
                                            className="accent"
                                        />
                                        <label htmlFor="upper">Uppercase</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}

export default PasswordGenerator