require('dotenv').config()
const response = require('../utils/response')
const editStatus = require('../editStatus/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	console.log('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl pretium fusce id velit ut tortor pretium viverra. Lacus viverra vitae congue eu consequat ac. At imperdiet dui accumsan sit amet. Tempor orci eu lobortis elementum nibh tellus. Lobortis scelerisque fermentum dui faucibus in ornare quam. Massa placerat duis ultricies lacus sed. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Volutpat est velit egestas dui id ornare. Enim sed faucibus turpis in eu mi. Facilisis volutpat est velit egestas dui id ornare. At quis risus sed vulputate.Pulvinar mattis nunc sed blandit libero volutpat. Ac orci phasellus egestas tellus rutrum tellus. Eu mi bibendum neque egestas congue quisque. Nunc sed id semper risus in hendrerit. Mattis aliquam faucibus purus in massa. Purus gravida quis blandit turpis cursus in hac. Ornare suspendisse sed nisi lacus sed viverra tellus. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Egestas integer eget aliquet nibh. Feugiat scelerisque varius morbi enim nunc. Mattis enim ut tellus elementum sagittis vitae et. Adipiscing elit duis tristique sollicitudin nibh. Varius duis at consectetur lorem donec massa sapien faucibus. Fringilla urna porttitor rhoncus dolor. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Nulla facilisi nullam vehicula ipsum a arcu cursus. Nunc congue nisi vitae suscipit tellus mauris a diam maecenaMattis pellentesque id nibh tortor id aliquet lectus. Consequat id porta nibh venenatis cras. Vulputate dignissim suspendisse in est ante. Fermentum et sollicitudin ac orci. Adipiscing diam donec adipiscing tristique. Vitae auctor eu augue ut lectus arcu. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. In vitae turpis massa sed elementum tempus egestas. Ac tortor vitae purus faucibus. Semper quis lectus nulla at volutpat. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Purus gravida quis blandit turpis. At ultrices mi tempus imperdiet. Eget lorem dolor sed viverra ipsum nunc aliquet. Ac odio tempor orci dapibus ultrices in. Vulputate eu scelerisque felis imperdiet. Enim nunc faucibus a pellentesque sit amet porttitor eget doloIn mollis nunc sed id semper risus in. Porttitor rhoncus dolor purus non. Aliquet nec ullamcorper sit amet risus. Amet mattis vulputate enim nulla. Ante in nibh mauris cursus. Viverra orci sagittis eu volutpat. Commodo quis imperdiet massa tincidunt. Facilisi etiam dignissim diam quis enim lobortis. Ipsum consequat nisl vel pretium lectus quam id. Fringilla est ullamcorper eget nulla facilisi. Nulla aliquet enim tortor at. Ultrices in iaculis nunc sed augue lacus viverrBlandit volutpat maecenas volutpat blandit. Placerat vestibulum lectus mauris ultrices. Feugiat pretium nibh ipsum consequat nisl vel. Dolor sed viverra ipsum nunc. Porttitor eget dolor morbi non arcu risus. Aliquam ut porttitor leo a diam sollicitudin. Varius sit amet mattis vulputate. Erat imperdiet sed euismod nisi porta. Nullam ac tortor vitae purus faucibus ornare. Odio aenean sed adipiscing diam donec adipiscing. Id porta nibh venenatis cras. Risus quis varius quam quisque id diam vel quam. Quis varius quam quisque id. Enim eu turpis egestas pretium. Ante in nibh mauris cursus mattis molestie a iaculis. Eleifend mi in nulla posuere sollicitudin. Vestibulum lorem sed risus ultricies tristique nulla aliquet.')
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			state = await editStatus(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"atendimento": "15136", "status": "Despachando", "saleIsComplete": true}' -X POST https://sales-backend.ziro.online/.netlify/functions/edit-status
// curl -d '{"atendimento": "15136", "status": "Despachando", "saleIsComplete": true}' -X POST http://localhost:9000/edit-status