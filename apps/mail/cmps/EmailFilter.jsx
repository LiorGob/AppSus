export function EmailFilter(props){
    return <section className="email-filter">
      
        <input type="text" placeholder="Filter by name" onChange={(ev)=>{
            props.onFilter(ev.target.value)

        }}/>
       

    </section>
}


