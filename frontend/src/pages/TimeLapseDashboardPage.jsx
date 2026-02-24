import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
`;

const drift = keyframes`
  0% { transform: translate3d(-6%, -4%, 0); }
  50% { transform: translate3d(5%, 6%, 0); }
  100% { transform: translate3d(-6%, -4%, 0); }
`;

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.main`
  --tl-hot: #ff8059;
  --tl-cool: #42a5f5;
  --tl-violet: #6e61ff;
  --tl-surface: ${props => props.theme.sidebar};
  --tl-border: ${props => props.theme.border};
  --tl-text: ${props => props.theme.text};
  --tl-muted: ${props => props.theme.textSecondary || `${props.theme.text}80`};

  flex: 1;
  min-height: 100vh;
  color: var(--tl-text);
  overflow-y: auto;
  overflow-x: hidden;
  width: ${props => (props.$collapsed ? '100%' : 'calc(100% - 320px)')};
  margin-left: ${props => (props.$collapsed ? '0' : '320px')};
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 128, 89, 0.2), transparent 40%),
    radial-gradient(circle at 82% 16%, rgba(66, 165, 245, 0.2), transparent 38%),
    radial-gradient(circle at 50% 92%, rgba(110, 97, 255, 0.18), transparent 35%),
    ${props => props.theme.background};

  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Content = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 44px 40px 68px;
  animation: ${reveal} 0.35s ease-out;

  @media (max-width: 768px) {
    padding: 28px 18px 54px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleWrap = styled.div`
  max-width: 740px;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: clamp(1.8rem, 3.2vw, 2.7rem);
  letter-spacing: -0.03em;
  line-height: 1.04;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--tl-muted);
  max-width: 700px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  border: 1px solid ${props => (props.$primary ? 'transparent' : 'var(--tl-border)')};
  background: ${props => (
    props.$primary
      ? 'linear-gradient(120deg, var(--tl-hot), var(--tl-violet))'
      : 'var(--tl-surface)'
  )};
  color: ${props => (props.$primary ? '#ffffff' : 'var(--tl-text)')};
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => (
      props.$primary
        ? '0 10px 20px rgba(110, 97, 255, 0.3)'
        : '0 8px 18px rgba(0, 0, 0, 0.14)'
    )};
  }
`;

const TimelineBand = styled.section`
  border: 1px solid var(--tl-border);
  border-radius: 18px;
  background: color-mix(in srgb, var(--tl-surface) 88%, transparent);
  backdrop-filter: blur(4px);
  padding: 16px;
  margin-bottom: 22px;
`;

const DayChips = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 12px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const DayChip = styled.button`
  border: 1px solid ${props => (props.$active ? 'transparent' : 'var(--tl-border)')};
  background: ${props => (
    props.$active
      ? 'linear-gradient(135deg, rgba(255, 128, 89, 0.9), rgba(66, 165, 245, 0.9))'
      : 'transparent'
  )};
  color: ${props => (props.$active ? '#ffffff' : 'var(--tl-text)')};
  border-radius: 12px;
  padding: 9px 10px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.16s ease, border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${props => (props.$active ? 'transparent' : 'color-mix(in srgb, var(--tl-cool) 46%, var(--tl-border))')};
  }
`;

const DayTitle = styled.div`
  font-size: 0.83rem;
  font-weight: 700;
`;

const DayDate = styled.div`
  font-size: 0.74rem;
  opacity: 0.85;
  margin-top: 2px;
`;

const Scrubber = styled.input`
  width: 100%;
  accent-color: #6e61ff;
  cursor: pointer;
`;

const HeroGrid = styled.section`
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1fr) 340px;
  margin-bottom: 22px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const OrbitCard = styled.article`
  position: relative;
  border: 1px solid var(--tl-border);
  border-radius: 22px;
  background:
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.08), transparent 46%),
    linear-gradient(165deg, color-mix(in srgb, var(--tl-surface) 86%, #121827 14%), var(--tl-surface));
  min-height: 520px;
  overflow: hidden;

  @media (max-width: 760px) {
    min-height: 420px;
  }
`;

const Starfield = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 20%, rgba(255, 255, 255, 0.45) 1px, transparent 1px),
    radial-gradient(circle at 76% 32%, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
    radial-gradient(circle at 64% 74%, rgba(255, 255, 255, 0.45) 1px, transparent 1px),
    radial-gradient(circle at 26% 68%, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
  background-size: 220px 220px;
  opacity: 0.6;
`;

const Nebula = styled.div`
  position: absolute;
  width: 300px;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(26px);
  background: radial-gradient(circle at 35% 35%, rgba(255, 128, 89, 0.55), rgba(110, 97, 255, 0.05));
  top: -120px;
  right: -90px;
  animation: ${drift} 11s ease-in-out infinite;
`;

const OrbitStage = styled.div`
  position: absolute;
  inset: 14px;
  display: grid;
  place-items: center;
`;

const OrbitRing = styled.div`
  position: absolute;
  width: ${props => props.$diameter}px;
  height: ${props => props.$diameter}px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.18);
`;

const OrbitRotator = styled.div`
  position: absolute;
  inset: 0;
  animation: ${orbitSpin} ${props => props.$duration}s linear infinite;
  animation-direction: ${props => (props.$reverse ? 'reverse' : 'normal')};
  animation-play-state: ${props => (props.$playing ? 'running' : 'paused')};
`;

const PlanetButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateX(${props => props.$radius}px);
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

const PlanetCore = styled.span`
  display: block;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  border: 2px solid ${props => (props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.45)')};
  background: ${props => props.$color};
  box-shadow:
    0 0 0 ${props => (props.$active ? 6 : 0)}px rgba(255, 255, 255, 0.18),
    0 10px 28px ${props => props.$color}66;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const Core = styled.div`
  width: clamp(116px, 22vw, 160px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 26% 24%, #fff6, transparent 26%),
    linear-gradient(140deg, rgba(255, 128, 89, 0.95), rgba(110, 97, 255, 0.95));
  border: 2px solid rgba(255, 255, 255, 0.42);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 12px;
  color: #fff;
  box-shadow:
    0 0 0 12px rgba(255, 255, 255, 0.06),
    0 22px 46px rgba(0, 0, 0, 0.35);
`;

const CoreLabel = styled.div`
  font-size: 0.73rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.86;
`;

const CoreValue = styled.div`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  line-height: 1.1;
`;

const CoreDate = styled.div`
  font-size: 0.76rem;
  margin-top: 4px;
  opacity: 0.84;
`;

const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MetricCard = styled.div`
  border: 1px solid var(--tl-border);
  background: var(--tl-surface);
  border-radius: 14px;
  padding: 14px;
`;

const MetricLabel = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tl-muted);
`;

const MetricValue = styled.div`
  margin-top: 8px;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 800;
`;

const MetricHint = styled.div`
  margin-top: 6px;
  font-size: 0.82rem;
  color: var(--tl-muted);
`;

const SelectedTaskCard = styled(MetricCard)`
  min-height: 138px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    linear-gradient(128deg, color-mix(in srgb, var(--tl-surface) 72%, #ffffff 6%), var(--tl-surface));
`;

const TaskName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const TaskMeta = styled.div`
  font-size: 0.82rem;
  color: var(--tl-muted);
  margin-top: 4px;
`;

const TaskScore = styled.div`
  margin-top: 11px;
  font-size: 1.05rem;
  font-weight: 700;
`;

const TaskPanel = styled.section`
  border: 1px solid var(--tl-border);
  border-radius: 20px;
  background: var(--tl-surface);
  overflow: hidden;
`;

const TaskHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 90px 90px minmax(160px, 0.8fr);
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--tl-border);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--tl-muted);
  font-weight: 700;

  @media (max-width: 900px) {
    display: none;
  }
`;

const TaskRows = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskRow = styled.button`
  border: none;
  text-align: left;
  background: ${props => (props.$selected ? 'rgba(66, 165, 245, 0.1)' : 'transparent')};
  color: inherit;
  padding: 14px 16px;
  border-bottom: 1px solid var(--tl-border);
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 90px 90px minmax(160px, 0.8fr);
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(66, 165, 245, 0.12);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const TaskMain = styled.div`
  min-width: 0;
`;

const TaskTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Lane = styled.div`
  margin-top: 5px;
  font-size: 0.78rem;
  color: var(--tl-muted);
`;

const ProgressCell = styled.div`
  font-size: 0.94rem;
  font-weight: 700;
`;

const Delta = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => {
    if (props.$value > 0) return '#3fcf8e';
    if (props.$value < 0) return '#ff7272';
    return 'var(--tl-muted)';
  }};
`;

const Trend = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 44px;
`;

const TrendBar = styled.span`
  width: 10px;
  height: ${props => Math.max(6, Math.round(props.$value * 0.36))}px;
  border-radius: 6px;
  background: ${props => (
    props.$active
      ? 'linear-gradient(180deg, var(--tl-hot), var(--tl-cool))'
      : 'color-mix(in srgb, var(--tl-cool) 42%, transparent)'
  )};
`;

const ProgressTrack = styled.div`
  margin-top: 9px;
  height: 7px;
  width: 100%;
  border-radius: 999px;
  background: color-mix(in srgb, var(--tl-border) 68%, transparent);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$value}%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--tl-hot), var(--tl-cool));
`;

const toShortDay = date => date.toLocaleDateString('en-US', { weekday: 'short' });
const toShortDate = date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const toLongDate = date => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

const buildTimeline = () => {
  const now = new Date();
  const dates = [];
  for (let back = 6; back >= 0; back -= 1) {
    const value = new Date(now);
    value.setDate(now.getDate() - back);
    dates.push({
      shortDay: toShortDay(value),
      shortDate: toShortDate(value),
      longDate: toLongDate(value),
    });
  }
  return dates;
};

const TIMELINE = buildTimeline();

const TASK_PLANETS = [
  {
    id: 'design-system',
    name: 'Design System',
    lane: 'Product Design',
    color: '#ff8f66',
    orbit: 0,
    history: [20, 28, 40, 51, 63, 76, 87],
  },
  {
    id: 'billing-api',
    name: 'Billing API',
    lane: 'Backend',
    color: '#6ec7ff',
    orbit: 1,
    history: [8, 16, 29, 36, 47, 59, 67],
  },
  {
    id: 'mobile-polish',
    name: 'Mobile Polish',
    lane: 'Frontend',
    color: '#8f7dff',
    orbit: 2,
    history: [34, 45, 58, 69, 79, 88, 96],
  },
  {
    id: 'analytics',
    name: 'Analytics Panel',
    lane: 'Data',
    color: '#3fd48f',
    orbit: 1,
    history: [14, 23, 36, 45, 56, 70, 84],
  },
  {
    id: 'qa-cycle',
    name: 'QA Cycle',
    lane: 'Release',
    color: '#ffd166',
    orbit: 2,
    history: [12, 19, 27, 39, 55, 74, 100],
  },
];

const average = values => {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const TimeLapseDashboardPage = ({ collapsed }) => {
  const [dayIndex, setDayIndex] = useState(TIMELINE.length - 1);
  const [selectedTaskId, setSelectedTaskId] = useState(TASK_PLANETS[0].id);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setInterval(() => {
      setDayIndex(previous => (previous >= TIMELINE.length - 1 ? 0 : previous + 1));
    }, 1450);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const selectedTask = useMemo(
    () => TASK_PLANETS.find(task => task.id === selectedTaskId) || TASK_PLANETS[0],
    [selectedTaskId]
  );

  const summary = useMemo(() => {
    const nowValues = TASK_PLANETS.map(task => task.history[dayIndex]);
    const previousValues = TASK_PLANETS.map(task => task.history[Math.max(0, dayIndex - 1)]);
    const avgNow = average(nowValues);
    const avgPrevious = average(previousValues);
    const completed = nowValues.filter(value => value >= 100).length;
    const atRisk = nowValues.filter(value => value < 50).length;
    return {
      avgNow,
      velocity: avgNow - avgPrevious,
      completed,
      atRisk,
    };
  }, [dayIndex]);

  const selectedNow = selectedTask.history[dayIndex];
  const selectedPrevious = selectedTask.history[Math.max(0, dayIndex - 1)];
  const selectedDelta = selectedNow - selectedPrevious;

  const shiftDay = delta => {
    setDayIndex(previous => {
      const max = TIMELINE.length - 1;
      if (previous + delta > max) return 0;
      if (previous + delta < 0) return max;
      return previous + delta;
    });
  };

  return (
    <PageContainer $collapsed={collapsed}>
      <Content>
        <Header>
          <TitleWrap>
            <Title>Time-Lapse Mission Control</Title>
            <Subtitle>
              Each task is a planet orbiting your weekly timeline. Planet size reflects progress for the selected day,
              and orbit speed stays active while the time-lapse is running.
            </Subtitle>
          </TitleWrap>
          <HeaderActions>
            <ActionButton onClick={() => shiftDay(-1)}>Previous Day</ActionButton>
            <ActionButton onClick={() => shiftDay(1)}>Next Day</ActionButton>
            <ActionButton $primary onClick={() => setIsPlaying(previous => !previous)}>
              {isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
            </ActionButton>
          </HeaderActions>
        </Header>

        <TimelineBand>
          <DayChips>
            {TIMELINE.map((day, index) => (
              <DayChip
                key={`${day.shortDay}-${day.shortDate}`}
                $active={index === dayIndex}
                onClick={() => {
                  setDayIndex(index);
                  setIsPlaying(false);
                }}
              >
                <DayTitle>{day.shortDay}</DayTitle>
                <DayDate>{day.shortDate}</DayDate>
              </DayChip>
            ))}
          </DayChips>
          <Scrubber
            type="range"
            min="0"
            max={TIMELINE.length - 1}
            step="1"
            value={dayIndex}
            onChange={event => {
              setDayIndex(Number(event.target.value));
              setIsPlaying(false);
            }}
            aria-label="Timeline day"
          />
        </TimelineBand>

        <HeroGrid>
          <OrbitCard>
            <Starfield />
            <Nebula />
            <OrbitStage>
              <Core>
                <div>
                  <CoreLabel>Focus Core</CoreLabel>
                  <CoreValue>{Math.round(summary.avgNow)}%</CoreValue>
                  <CoreDate>{TIMELINE[dayIndex].longDate}</CoreDate>
                </div>
              </Core>

              {TASK_PLANETS.map(task => {
                const progress = task.history[dayIndex];
                const radius = 88 + task.orbit * 54;
                const diameter = radius * 2;
                const size = 14 + Math.round(progress * 0.28);
                const duration = 24 + task.orbit * 8 + task.id.length;
                const active = selectedTaskId === task.id;

                return (
                  <React.Fragment key={task.id}>
                    <OrbitRing $diameter={diameter} />
                    <OrbitRotator
                      $duration={duration}
                      $reverse={task.orbit % 2 === 1}
                      $playing={isPlaying}
                    >
                      <PlanetButton
                        $radius={radius}
                        onClick={() => setSelectedTaskId(task.id)}
                        aria-label={`Select ${task.name}`}
                        title={`${task.name}: ${progress}%`}
                      >
                        <PlanetCore
                          $size={size}
                          $color={task.color}
                          $active={active}
                        />
                      </PlanetButton>
                    </OrbitRotator>
                  </React.Fragment>
                );
              })}
            </OrbitStage>
          </OrbitCard>

          <SideColumn>
            <MetricCard>
              <MetricLabel>Fleet Velocity</MetricLabel>
              <MetricValue>{summary.velocity >= 0 ? '+' : ''}{Math.round(summary.velocity)}%</MetricValue>
              <MetricHint>Average day-over-day movement</MetricHint>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Completed Orbits</MetricLabel>
              <MetricValue>{summary.completed}/{TASK_PLANETS.length}</MetricValue>
              <MetricHint>Tasks at 100% on this day</MetricHint>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Attention Needed</MetricLabel>
              <MetricValue>{summary.atRisk}</MetricValue>
              <MetricHint>Tasks below 50% completion</MetricHint>
            </MetricCard>
            <SelectedTaskCard>
              <MetricLabel>Selected Planet</MetricLabel>
              <TaskName>{selectedTask.name}</TaskName>
              <TaskMeta>{selectedTask.lane}</TaskMeta>
              <TaskScore>
                {selectedNow}% ({selectedDelta >= 0 ? '+' : ''}{selectedDelta}%)
              </TaskScore>
            </SelectedTaskCard>
          </SideColumn>
        </HeroGrid>

        <TaskPanel>
          <TaskHeader>
            <div>Task</div>
            <div>Progress</div>
            <div>Delta</div>
            <div>Time-Lapse</div>
          </TaskHeader>
          <TaskRows>
            {TASK_PLANETS.map(task => {
              const progress = task.history[dayIndex];
              const previous = task.history[Math.max(0, dayIndex - 1)];
              const delta = progress - previous;
              const selected = task.id === selectedTaskId;
              return (
                <TaskRow
                  key={task.id}
                  $selected={selected}
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <TaskMain>
                    <TaskTitle>{task.name}</TaskTitle>
                    <Lane>{task.lane}</Lane>
                    <ProgressTrack>
                      <ProgressFill $value={progress} />
                    </ProgressTrack>
                  </TaskMain>
                  <ProgressCell>{progress}%</ProgressCell>
                  <Delta $value={delta}>{delta >= 0 ? '+' : ''}{delta}%</Delta>
                  <Trend>
                    {task.history.map((value, historyIndex) => (
                      <TrendBar
                        key={`${task.id}-${historyIndex}`}
                        $value={value}
                        $active={historyIndex === dayIndex}
                      />
                    ))}
                  </Trend>
                </TaskRow>
              );
            })}
          </TaskRows>
        </TaskPanel>
      </Content>
    </PageContainer>
  );
};

export default TimeLapseDashboardPage;
