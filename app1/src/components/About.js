import React , {useState} from 'react'

export default function About() {

    // let myStyle ={
    //     color: 'white',
    //     backgroundColor:'black'
    // }
    const [myStyle,setMystyle]=useState(
        {
            color:'black',
            backgroundColor:'white'

        }
    )
    const [btntext ,setBtnText]=useState("Enable Dark Mode")
   const toggleStyle = ()=> {
        if(myStyle.color==='black')
        {
            setMystyle({
                color:'white',
                backgroundColor:'black',
                            border:'2px solid white'
            })
            setBtnText("Enable Light Mode")
        }
        else{
            setMystyle({
                color:'black',
                backgroundColor:'white'
            })

            setBtnText("Enable Dark Mode")
        }
    }
  return (
    <div className='container' style={myStyle}>

                <h1 className='my-2'>About Us</h1>
            
                <div class="accordion accordion-flush" id="accordionFlushExample"  style={myStyle} >
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"  style={myStyle}>
                    Accordion Item #1
                </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"  style={myStyle}>
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button  style={myStyle} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Accordion Item #2
                </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"  style={myStyle}>
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button  style={myStyle} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Accordion Item #3
                </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"  style={myStyle}>
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                </div>
            </div>
            </div>
       <div  className='container my-2' onClick={toggleStyle}> <button type="button" class="btn btn-primary">{btntext}</button> </div>
    </div>
  )
}
