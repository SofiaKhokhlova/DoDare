import "../css/stats.css";

function StatsComponent () {
    return(
        <>
            <div className="stats-component">
                <p className="stats-title">Achievements and Statistics</p>
                <div className="stats-part">
                    <div className="stats-element">
                        <p className="stats-element-name">Number of completed tasks:</p>
                        <p className="stats-element-number">100</p>
                    </div>
                    <div className="stats-element">
                        <p className="stats-element-name">Achievements done:</p>
                        <p className="stats-element-number">50</p>
                    </div>
                    <div className="stats-element">
                        <p className="stats-element-name">Number of groups:</p>
                        <p className="stats-element-number">4</p>
                    </div>
                </div>
                <div className="achievement-part">
                    {Array.from({ length: 21 }).map((_, index) => (
                        <div key={index} className="achievement-element">
                            <img src="/done-achevement.png" alt="done-achievement" className="done"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StatsComponent;