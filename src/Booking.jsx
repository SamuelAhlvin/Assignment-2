import { useStates } from './utilities/states';

export default function Booking() {

  const s = useStates('main');

  return <>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="booking">
            <h3>Booking Page</h3>
          </div>
        </div>
      </div>
    </div>
  </>;

}