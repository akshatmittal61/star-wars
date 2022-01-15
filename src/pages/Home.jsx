import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import GlobalContext from "../Context/GlobalContext";
import bg from "../images/1.jpg";

const Home = () => {
	const [font, setFont] = useState(15);
	const [allPeople, setAllPeople] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPeople, setTotalPeople] = useState(10);
	const { axiosInstance } = useContext(GlobalContext);
	useEffect(() => {
		setFont(10);
		axiosInstance(`people`).then((res) => setTotalPeople(res.data.count));
		return () => {
			console.log("Good");
		};
	}, []);
	const getIcon = (str) => {
		if (str === "Droid") return <i className="fab fa-android"></i>;
		else if (str === "Human") return <i className="fas fa-circle"></i>;
		else return <i className="fas fa-question"></i>;
	};
	useEffect(() => {
		setIsLoading(true);
		axiosInstance(`people/?page=${pageNo}`).then((res) => {
			let newPeople = [...res.data.results];
			res.data.results.map((a, index) => {
				axios(a.homeworld).then((res) => {
					newPeople[index].homeworld = res.data.name;
					setTimeout(() => {
						setAllPeople([...newPeople]);
					}, 2);
				});
			});
			res.data.results.map((a, index) => {
				a.films.map((b, id) => {
					axios(b).then((res) => {
						newPeople[index].films[id] = res.data.title;
						setTimeout(() => {
							setAllPeople([...newPeople]);
						}, a.films.length * 10);
					});
				});
			});
			res.data.results.map((a, index) => {
				a.species.map((b, id) => {
					axios(b).then((res) => {
						newPeople[index].species[id] = res.data.name;
						setTimeout(() => {
							setAllPeople([...newPeople]);
						}, a.species.length * 10);
					});
				});
			});
			res.data.results.map((a, index) => {
				a.vehicles.map((b, id) => {
					axios(b).then((res) => {
						newPeople[index].vehicles[id] = res.data.name;
						setTimeout(() => {
							setAllPeople([...newPeople]);
						}, a.vehicles.length * 10);
					});
				});
			});
			res.data.results.map((a, index) => {
				a.starships.map((b, id) => {
					axios(b).then((res) => {
						newPeople[index].starships[id] = res.data.name;
						setTimeout(() => {
							setAllPeople([...newPeople]);
						}, a.starships.length * 10);
					});
				});
			});
			setIsLoading(false);
		});
	}, [pageNo]);
	return (
		<section className="home" style={{ backgroundImage: `url(${bg})` }}>
			<Header />
			<div className="home-hero">
				<span style={{ fontSize: `${font}rem` }}>Star</span>
				<span style={{ fontSize: `${font}rem` }}>Wars</span>
			</div>
			<div className="home-controls">
				<div className="home-controls-search">
					<input />
				</div>
				<div className="home-controls-page">
					<button
						className="icon icon-sm"
						onClick={() =>
							setPageNo(pageNo === 1 ? pageNo : pageNo - 1)
						}
						title={
							pageNo <= 1
								? "No more going back"
								: "Go to previous page"
						}
						disabled={pageNo <= 1}
					>
						<span className="material-icons">chevron_left</span>
					</button>
					<span>
						{pageNo} of {parseInt(totalPeople / 10) + 1}
					</span>
					<button
						className="icon icon-sm"
						onClick={() =>
							setPageNo(
								totalPeople / 10 > pageNo ? pageNo + 1 : pageNo
							)
						}
						title={
							totalPeople / 10 > pageNo
								? "Go To next page"
								: "No more going forward"
						}
						disabled={totalPeople / 10 <= pageNo}
					>
						<span className="material-icons">chevron_right</span>
					</button>
				</div>
			</div>
			<div className="home-data">
				<table className="home-data-table">
					<tbody>
						<tr>
							<th>S.No.</th>
							<th>Name</th>
							<th>Height</th>
							<th>Mass</th>
							<th>Hair Color</th>
							<th>Skin Color</th>
							<th>Eye Color</th>
							<th>Birth year</th>
							<th>Gender</th>
							<th>Home World</th>
							<th>Films</th>
							<th>Species</th>
							<th>Vehicles</th>
							<th>Starships</th>
						</tr>
						{allPeople.map((people, index) => (
							<tr key={index}>
								<td>{(pageNo - 1) * 10 + (index + 1)}</td>
								<td>{people.name}</td>
								<td>{people.height}</td>
								<td>{people.mass}</td>
								<td>{people.hair_color}</td>
								<td>{people.skin_color}</td>
								<td>{people.eye_color}</td>
								<td>{people.birth_year}</td>
								<td>{people.gender}</td>
								<td>{people.homeworld}</td>
								<td>
									{people.films.map((film, index) => (
										<div key={index}>{film}</div>
									))}
								</td>
								<td>
									{people.species.map((specie, index) => (
										<div
											key={index}
											style={{
												display: "flex",
												flexFlow: "column",
											}}
										>
											{specie}
											{getIcon(specie)}
										</div>
									))}
								</td>
								<td>
									{people.vehicles.map((vehicle, index) => (
										<div key={index}>{vehicle}</div>
									))}
								</td>
								<td>
									{people.starships.map((starship, index) => (
										<div key={index}>{starship}</div>
									))}
								</td>
							</tr>
						))}
						{isLoading && (
							<tr>
								<td
									colSpan="14"
									className="home-data-null-spinner"
								>
									<i className="fas fa-spinner-third"></i>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Home;
