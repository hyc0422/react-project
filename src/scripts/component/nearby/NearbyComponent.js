import Fetch from '../../module/fetch'
import HeaderComponent from '../common/HeaderComponent'
import NearbyListComponent from './NearbyListComponent'
import NearbyPositionComponent from './NearbyPositionComponent'
class NearbyComponent extends React.Component {
	constructor(props,context) {
        super(props,context)
        this.state={
        	isRed:true,
        	data:'',
			count:'',
			id:''
        }
    }
	changeNavStyle(){
		this.setState({
			isRed:true
		})
	}
	changeNavStyle1(){
		this.setState({
			isRed:false
		})
	}
	getData(url,cb){
		let that = this
        Fetch.Get(url,{
        }).then(res=>{
           return res.json()
        }).then(json=>{      
        	cb(json)                      
        })
	}

	loadDate(){
		let that=this
		if(that.state.isRed){
			that.getData("http://localhost:9000/loho/store/count",(json)=>{
				//console.log(json)
				that.setState({
					count:json
				})
			})
			that.getData("http://localhost:9000/loho/store/"+this.state.id,(json)=>{
				console.log(json)
				that.setState({
					data:json
				})
<<<<<<< HEAD

=======
>>>>>>> origin/lyy20170925
				
			})
		}      
	}
	componentWillMount(){
		let that=this
		// console.log(JSON.stringify(that.props.params))
		if(JSON.stringify(that.props.params)=="{}"){
			that.setState({
				id: JSON.parse(localStorage.position).cityId
			},()=>{
				that.loadDate()
			})			
		}else if(JSON.stringify(that.props.params.id)!="null"){		
			that.setState({
				id:that.props.params.id
			},()=>{
				that.loadDate()
			})
		}		
		else{
			that.setState({
				id: JSON.parse(localStorage.position).cityId
			},()=>{
				that.loadDate()
			})
		}		       	
    }
    render(){
        return (
            <div >
                <HeaderComponent data={this.props}/>
                <div className="nearbyNav">
                	<ul>
                		<li className={this.state.isRed?'active':''} onClick={this.changeNavStyle.bind(this)}>列表<span></span></li>
                		<li className={this.state.isRed?'':'active'} onClick={this.changeNavStyle1.bind(this)}>地图</li>                		
                	</ul>
                	
                </div>
                {this.state.isRed?<NearbyListComponent listdata={this.state}/>:<NearbyPositionComponent/>}
             </div> 
            
        )
    }
}
NearbyComponent.defaultProps={
        position:"",
        fanhui: "icon-iconback",
        title: "查找体验店",
        gouwu: "icon-gouwuche",
        login: "icon-gengduo"   
}
export default NearbyComponent
