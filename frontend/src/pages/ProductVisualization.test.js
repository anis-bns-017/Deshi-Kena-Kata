import { render, screen } from "@testing-library/react";
import ProductVisualization from "./ProductVisualization";

test("renders loading spinner when data is being fetched", () => {
  render(<ProductVisualization />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});

test("displays no data message when filteredData is empty", () => {
  render(<ProductVisualization />);
  const noDataMessage = screen.getByText(/No data available/i);
  expect(noDataMessage).toBeInTheDocument();
});