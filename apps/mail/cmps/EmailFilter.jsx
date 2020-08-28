export function EmailFilter(props){
    return <section className="email-filter">
      
        <input type="text" placeholder="Search email" onChange={(ev)=>{
            props.onFilter(ev.target.value)

        }}/>
       

    </section>
}



