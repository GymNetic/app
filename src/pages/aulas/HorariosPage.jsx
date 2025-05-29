import './HorariosPage.css';
import ScheduleGrid from "../../components/ScheduleGrid.jsx";

function HorariosPage() {
    return (
        <div className="horarios-page">
            <div className="horarios-header">
                <h1>Horários de Aulas</h1>
                <p>Consulte nossos horários semanais e planeje seus treinos</p>
            </div>
            <ScheduleGrid/>
        </div>
    );
}
export default HorariosPage;