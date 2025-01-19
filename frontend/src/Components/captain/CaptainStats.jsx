import React, { useContext } from "react";
import { FaClock, FaTachometerAlt, FaTicketAlt } from "react-icons/fa";
import { CaptainDataContext } from "../../Context/CaptainContext";

const CaptainStats = () => {
  const { setIsRideRequestPanelOpen } = useContext(CaptainDataContext);

  return (
    <section
      className="captain-stats"
      onClick={() => setIsRideRequestPanelOpen(true)}
    >
      {/* Stat Item 1 */}
      <div className="captain-stats__item">
        <FaClock className="captain-stats__icon" />
        <p className="captain-stats__value">10.2</p>
        <p className="captain-stats__label">Hours Online</p>
      </div>

      {/* Stat Item 2 */}
      <div className="captain-stats__item">
        <FaTachometerAlt className="captain-stats__icon" />
        <p className="captain-stats__value">10.2</p>
        <p className="captain-stats__label">Hours Online</p>
      </div>

      {/* Stat Item 3 */}
      <div className="captain-stats__item">
        <FaTicketAlt className="captain-stats__icon" />
        <p className="captain-stats__value">10.2</p>
        <p className="captain-stats__label">Hours Online</p>
      </div>
    </section>
  );
};

export default CaptainStats;
