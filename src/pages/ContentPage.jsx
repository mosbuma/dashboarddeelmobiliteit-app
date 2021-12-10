import './ContentPage.css'
import { useSelector } from 'react-redux';

export default function ContentPage(props) {
  const isFilterBarVisible = useSelector(state => {
    return state.ui ? state.ui.FILTERBAR : false;
  });

  return (
    <div
      className={`ContentPage ${isFilterBarVisible ? '' : 'full-page'}`}
      style={{
        paddingTop: '51px',
        overflowY: 'auto',
      }}
    >
      <div className="ContentPage-inner py-8 pl-12">
        {props.children}
      </div>
    </div>
  );
}
