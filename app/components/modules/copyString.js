import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function CopyString({ string }) {
	return (
		<CopyToClipboard text={string}>
			<Button variant="outline" className="py-0 px-1">
				<FontAwesomeIcon icon={faCopy} />
			</Button>
		</CopyToClipboard>
	);
}
