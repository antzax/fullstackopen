import { useState } from "react";
import "./app.css";

const Button = ({ onClick, buttonText }) => (
  <button onClick={onClick}>{buttonText}</button>
);

const StatisticLine = ({ text, statistic }) => (
  <tr>
    <td>{text}</td>
    <td>{statistic}</td>
  </tr>
);

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) => (
  <div>
    <h2>Statistics</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Statistic</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" statistic={good} />
        <StatisticLine text="neutral" statistic={neutral} />
        <StatisticLine text="bad" statistic={bad} />
        <StatisticLine text="total" statistic={total} />
        <StatisticLine text="average" statistic={average} />
        <StatisticLine text="positive" statistic={positivePercentage + "%"} />
      </tbody>
    </table>
  </div>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const total = ratings.good + ratings.neutral + ratings.bad;
  const average =
    total === 0 ? 0 : Number(((ratings.good - ratings.bad) / total).toFixed(2));
  const positivePercentage =
    total === 0 ? 0 : Number(((ratings.good / total) * 100).toFixed(2));

  const handleClick = (type) => {
    setRatings((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={() => handleClick("good")} buttonText="good" />
      <Button onClick={() => handleClick("neutral")} buttonText="neutral" />
      <Button onClick={() => handleClick("bad")} buttonText="bad" />
      {total <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={ratings.good}
          neutral={ratings.neutral}
          bad={ratings.bad}
          total={total}
          average={average}
          positivePercentage={positivePercentage}
        />
      )}
    </div>
  );
};

export default App;
