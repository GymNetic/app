import './HorariosPage.css';
import ScheduleGrid from "../../components/ScheduleGrid.jsx";

function HorariosPage() {
    return (
        <div className="horarios-page">
            <div className="horarios-header">
                <h1>Horários de Aulas</h1>
                <p>Consulta os nossos horários semanais e planeia os teus treinos</p>
            </div>
            <ScheduleGrid/>
        </div>
    );
}
export default HorariosPage;