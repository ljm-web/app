import Mock from 'mockjs'
const Random = Mock.Random

const array = ['电脑', '手机', '苹果', '香蕉', '高等奥数', '4级英语', '历史书', '网红面包', '洗面奶', '方便面', '游戏机', '家电']

let list = []
for (let i = 0; i < 98; i++) {
	list.push({
		id: Random.id(),
		sort: Random.increment(1),
		img: Random.dataImage('80x80'),
		name: Random.pick(array),
		price: Random.integer(1, 100) + '.' + Random.integer(0, 9) + Random.integer(0, 9),
		state: Random.boolean(8, 2, true)
	})
}

Mock.mock('/data/listshopping', 'post', (e) => {
	const size = JSON.parse(e.body).size
	const page = JSON.parse(e.body).page
	let data = list.slice((page - 1) * size, page * size)
	return {
		total: list.length,
		list: data
	};
})

Mock.mock('/data/delectshopping', 'post', (e) => {
	
	const size = JSON.parse(e.body).size;
	const page = JSON.parse(e.body).page;
	const idlist = JSON.parse(e.body).id
	
	for (let i = 0; i < idlist.length; i++) {
		for(let t = 0; t < list.length; t++){
			if(list[t].id == idlist[i]){
				list.splice(t,1)
			}
		}
	}
	
	//判断是否是搜索内容删除
	if(JSON.parse(e.body).search != ''){
		const search = JSON.parse(e.body).search
		let data = []
		for(let i=0;i<list.length;i++){
			if(list[i].name.indexOf(search)==0){
				data.push(list[i])
			}
		}
		
		let sun =[];
		if(data.length>(page - 1) * size){
			sun = data.slice((page - 1) * size, page * size);
		}else{
			sun = data.slice((page - 2) * size, page * size);
		}
		
		return {
			total: data.length,
			list: sun
		}
	}

	let data = []
	if(list.length>(page - 1) * size){
		data = list.slice((page - 1) * size, page * size)
	}else{
		data = list.slice((page - 2) * size, page * size)
	}
	
	return {
		total: list.length,
		list: data
	};
})

Mock.mock('/data/searchshopping', 'post', (e) => {
	const size = JSON.parse(e.body).size;
	const page = JSON.parse(e.body).page;
	const search = JSON.parse(e.body).search;
	
	let data = [];
	
	for(let i=0;i<list.length;i++){
		if(list[i].name.indexOf(search)==0){
			data.push(list[i])
		}
	}

	let sun = data.slice((page - 1) * size, page * size)
	
	return {
		total: data.length,
		list: sun
	}
});

//订单查询
let logistics = [];
const adders = ['广东广州市','北京市','广东潮汕','湖南','四川成都','海南三亚','福建夏目','上海市','哈尔滨','吉林长春']
for (let i = 0; i < 34; i++) {
	
	let time = Random.datetime('yyyy-MM-dd');
	let activities = [{
			content: '卖家已经发货',
			timestamp: time,
			type:'success',
			icon:'el-icon-check'
		}]
	const tatol = Random.integer(2,10)
	for(let i = 0; i < tatol; i++){
		activities.push({
			content: Random.pick(adders),
			timestamp: Random.datetime('yyyy-MM-dd'),
			type:'success',
			icon:'el-icon-check'
		})		
	}
	activities.push({
		content: Random.pick(adders),
		timestamp: Random.datetime('yyyy-MM-dd'),
		type:'',
		icon:''
	})	
	
	logistics.push({
		id: Random.id(),
		sort: Random.character('upper') + Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',19),
		start: time,
		over: Random.now('yyyy-MM-dd'),
		state: Random.boolean(),
		activities	
	})
}
Mock.mock('/data/listlogistics', 'post', (e) => {

	const size = JSON.parse(e.body).size;
	const page = JSON.parse(e.body).page;
	const search = JSON.parse(e.body).search;
	let data = []
	
	if(search.sort != ''){
		let searcharray = []
		for(let i=0;i<logistics.length;i++){
			if(logistics[i].sort.toString().indexOf(search.sort)>=0){
				searcharray.push(logistics[i])
			}
		}
		if(search.state!='1'){
			for(let i=0;i<searcharray.length;i++){
				if(searcharray[i].state.toString() == search.state){
					data.push(logistics[i])
				}
			}
			return {
				total: data.length,
				list: data.slice((page - 1) * size, page * size)
			};
		}else{
			return {
				total: searcharray.length,
				list: searcharray.slice((page - 1) * size, page * size)
			};
		}
	}else{
		if(search.state!='1'){
			for(let i=0;i<logistics.length;i++){
				if(logistics[i].state.toString() == search.state){
					data.push(logistics[i])
				}
			}
			return {
				total: data.length,
				list: data.slice((page - 1) * size, page * size)
			};
		}
	}

	data = logistics.slice((page - 1) * size, page * size)
	return {
		total: logistics.length,
		list: data
	};
});

//评论内容
const comment = []
for(let i=0;i<23;i++){
	let business = [];
	let state = false;
	let score = Random.integer(1,5)
	if(Random.boolean(7, 3, true)){
		business = [Random.paragraph(1,3)];
		state = true;
		score = 5
	}
	comment.push({
		id:Random.id(),
		img:Random.dataImage('80x80'),
		score,
		comment: Random.paragraph(2),
		business,
		state,
		sum:Random.integer(0,1000)
	})
}
let suns = [];
let sums = [];
for(let i=0;i<comment.length;i++){
	if(comment[i].score == 5){
		suns.push(comment[i])
	}else{
		sums.push(comment[i])
	}
}
Mock.mock('/data/listcomment', 'post', (e) => {
	const size = JSON.parse(e.body).size;
	const page = JSON.parse(e.body).page;
	const select = JSON.parse(e.body).select;
	const input = JSON.parse(e.body).input;
	const id = JSON.parse(e.body).id;
	
	
	if(input){
		for(let i=0;i<comment.length;i++){
			if(comment[i].id == id){
				comment[i].business = [...comment[i].business,input];
				comment[i].state = true;
			}
		}
	}
	
	if(select!=''){
		if(select != '5' ){
			return {
				good: (suns.length/comment.length).toFixed(2)*100,
				total: suns.length,
				list: suns.slice((page - 1) * size, page * size)
			};
		}else{
			return {
				good: (suns.length/comment.length).toFixed(2)*100,
				total: sums.length,
				list: sums.slice((page - 1) * size, page * size)
			};
		}
	}

	return {
		good: (suns.length/comment.length).toFixed(2)*100,
		total: comment.length,
		list: comment.slice((page - 1) * size, page * size)
	};
})

//客服
let chat = [];
for(let i=0;i<23;i++){
	let comemt = [];
	for(let t=0;t<Random.integer(1,5);t++){
		comemt.push(Random.paragraph(1, 3))
	}
	
	chat.push({
		id: Random.id(),
		name: Random.cname(),
		comemt,
		img:Random.dataImage('50x50'),
		sun:comemt.length,
	})
}
Mock.mock('/data/listchat', 'post', (e) => {
	return chat;
})
//用户操作
let user = [];
for(let i=0;i<34;i++){
	user.push({
		id:Random.first(),
		time:Random.datetime('yyyy-MM-dd'),
		grade:Random.pick(['普通', '黄金', '黑钻', '至尊']),
		state:Random.boolean(3, 7, false),
		img:Random.dataImage('50x50')
	})
}
Mock.mock('/data/listuser', 'post', (e) => {
	const page = JSON.parse(e.body).page;
	
	const radio = JSON.parse(e.body).radio;
	const value = JSON.parse(e.body).value;
	const input3 = JSON.parse(e.body).input3;
	const id = JSON.parse(e.body).id;
	
	let data = [];
	
	if(radio){
		if(radio == '全部'){
			data = user;
		}
		if(radio == '正常'){			
			for(let i=0;i<user.length;i++){
				if(user[i].state){
					data.push(user[i]);					
				}
			}
		}
		if(radio == '冻结'){
			for(let i=0;i<user.length;i++){
				if(!user[i].state){
					data.push(user[i]);					
				}
			}
		}
	}
	
	let select = [];
	
	if(value){	
		if(value == '全部'){
			select = data;
		}
		if(value == '普通'){
			for(let i=0;i<data.length;i++){
				if(data[i].grade == value){
					select.push(data[i]);					
				}
			}
		}
		if(value == '黄金'){
			for(let i=0;i<data.length;i++){
				if(data[i].grade == value){
					select.push(data[i]);					
				}
			}
		}
		if(value == '黑钻'){
			for(let i=0;i<data.length;i++){
				if(data[i].grade == value){
					select.push(data[i]);					
				}
			}
		}
		if(value == '至尊'){
			for(let i=0;i<data.length;i++){
				if(data[i].grade == value){
					select.push(data[i]);					
				}
			}
		}										
	}
	
	let input = [];
	
	if(input3){
		for(let i=0;i<select.length;i++){
			if(select[i].id == input3){
				input.push(select[i]);					
			}
		}
	}else{
		input = select;
	}
	
	if(id){
		for(let i =0;i<input.length;i++){
			if(input[i].id == id){
				input[i].state = !input[i].state;
			}
		}
	}
		
	return {
		data: input.slice((page - 1) * 10, page * 10),
		total:input.length
	};
})
//活动下线
let active = [];
let activehistrity = [];
const ilist = Random.integer(5,10);
for(let i=0;i<ilist;i++){
	
	let a = Random.integer(1,6);
	let lei = [];
	for(let o=0;o<a;o++){
		lei.push(
			Random.pick(['名牌家电', '悠闲零食', '日用百货', '新鲜果蔬', '数码电子产品','进口货物'])
		)
	}
	
	active.push({
		id:Random.id(),
		title:Random.pick(['年货打折', '新春优惠', '金秋好礼', '11.11满减', '12.12满减','百亿补贴']),
		name:'全部会员',
		start:Random.datetime('yyyy-MM-dd HH:mm:ss'),
		over:Random.datetime('yyyy-MM-dd HH:mm:ss'),
		state:Random.boolean(9, 1, true),
		lei,
		setup:Random.pick(['优惠互斥','优惠不互斥']),
		content:Random.paragraph(1, 3)
	});
}
Mock.mock('/data/listactive', 'post', (e) => {
	const id = JSON.parse(e.body).id;
	if(id){
		for(let i=0;i<active.length;i++){			
			if(active[i].id == id){
				activehistrity.unshift(active[i])
				active.splice(i,1);
			}
		}
		
	}
	return {data:active};
})

for(let i=0;i<10;i++){
	let a = Random.integer(1,6);
	let lei = [];
	for(let o=0;o<a;o++){
		lei.push(
			Random.pick(['名牌家电', '悠闲零食', '日用百货', '新鲜果蔬', '数码电子产品','进口货物'])
		)
	}	
	activehistrity.push({
		id:Random.id(),
		title:Random.pick(['年货打折', '新春优惠', '金秋好礼', '11.11满减', '12.12满减','百亿补贴']),
		name:'全部会员',
		start:Random.datetime('yyyy-MM-dd HH:mm:ss'),
		over:Random.datetime('yyyy-MM-dd HH:mm:ss'),
		state:Random.boolean(9, 1, true),
		lei,
		setup:Random.pick(['优惠互斥','优惠不互斥']),
		content:Random.paragraph(1, 3)
	});
}		
Mock.mock('/data/listhistryactive', 'post', (e) => {
	return {data:activehistrity};
})			