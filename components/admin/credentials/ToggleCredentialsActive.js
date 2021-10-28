import axios from 'axios'

export default function ToggleCredentialsActive(id,set) {
console.log(id,":)@@@@@@@@@@@@@)",set)

axios
			.put('/api/putEditCredentials', {
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					id: id,
					newStatus: set,
				},
			})
			.then((res) => {
				if (res.status == '204') {
                    console.log("204")
                    return true
				} else {
                    return false
				}
			});


}
