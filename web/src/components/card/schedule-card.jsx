import React from 'react';
import './schedule-card.scss';

function ScheduleCard() {
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="/assets/images/poster.jpeg" className="img-fluid rounded-start" alt="images" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">The Creator</h5>
              <p className="card-text description-film">The creator the film produced by hoangDieu director.</p>
              <p className="card-text">
                <small className="text-muted">Thể loại: Hành động | Thời lượng: 128p</small>
              </p>
              <div className="container-fluid">
                <button className="btn btn-time" disabled>
                  9:30 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time" disabled>
                  10:15 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time" disabled>
                  11:00 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  11:45 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  12:30 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  13:15 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  14:00 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  14:45 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="/assets/images/poster2.jpg" className="img-fluid rounded-start" alt="images" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Trạng Tuệ</h5>
              <p className="card-text description-film">
                Trạng Tuệ với trí thông minh vượt xa tầm hiểu biết của loài người.
              </p>
              <p className="card-text">
                <small className="text-muted">Thể loại: Tâm lý, tình cảm | Thời lượng: 165p</small>
              </p>
              <div className="container-fluid">
                <button className="btn btn-time" disabled>
                  9:30 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time" disabled>
                  10:15 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time" disabled>
                  11:00 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  11:45 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  12:30 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  13:15 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  14:00 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
                <button className="btn btn-time">
                  14:45 <br /> <span style={{ fontSize: '0.8rem', color: 'var(--border-color-dark)' }}>45k</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
