import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import GlobalContext from "../Context/GlobalContext";
import bg from "../images/1.jpg";

const Home = () => {
	const [font, setFont] = useState(15);
	const [allPeople, setAllPeople] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPeople, setTotalPeople] = useState(10);
	const [searchStr, setSearchStr] = useState("");
	const [cards, setCards] = useState([]);
	let cardNames = [];
	const { axiosInstance } = useContext(GlobalContext);
	const getSpecies = async (i) => {
		let totSpecies = 10;
		await axiosInstance(`species`).then((res) => {
			totSpecies = res.data.count;
		});
		await axiosInstance(`species/?page=${i}`).then((res) => {
			res.data.results.forEach((sp) => {
				cardNames = [
					...cardNames,
					{ name: sp.name, count: sp.people.length },
				];
			});
		});
		setCards(cardNames);
		if (i <= totSpecies / 10) getSpecies(i + 1);
	};
	useEffect(() => {
		setFont(8.5);
		getSpecies(1);
		return () => {
			console.log(true);
		};
	}, []);
	const getIcon = (str) => {
		if (str === "Droid") return <i className="fab fa-android"></i>;
		else if (str === "Human") return <i className="fas fa-circle"></i>;
		else return <i className="fas fa-question"></i>;
	};
	useEffect(() => {
		setIsLoading(true);
		let callStr = "";
		if (searchStr === "") {
			callStr = `people/?page=${pageNo}`;
			axiosInstance(`people`).then((res) =>
				setTotalPeople(res.data.count)
			);
		} else {
			callStr = `https://swapi.py4e.com/api/people/?search=${searchStr}&page=${pageNo}`;
			axiosInstance(callStr).then((res) =>
				setTotalPeople(res.data.count)
			);
		}
		axiosInstance(callStr).then((res) => {
			let newPeople = [...res.data.results];
			if (res.data.count === 0) setAllPeople([]);
			else {
				res.data.results.forEach((a, index) => {
					axios(a.homeworld).then((res) => {
						newPeople[index].homeworld = res.data.name;
						setTimeout(() => {
							setAllPeople([...newPeople]);
						}, 2);
					});
				});
				res.data.results.forEach((a, index) => {
					a.films.forEach((b, id) => {
						axios(b).then((res) => {
							newPeople[index].films[id] = res.data.title;
							setTimeout(() => {
								setAllPeople([...newPeople]);
							}, a.films.length * 10);
						});
					});
				});
				res.data.results.forEach((a, index) => {
					a.species.forEach((b, id) => {
						axios(b).then((res) => {
							newPeople[index].species[id] = res.data.name;
							setTimeout(() => {
								setAllPeople([...newPeople]);
							}, a.species.length * 10);
						});
					});
				});
				res.data.results.forEach((a, index) => {
					a.vehicles.forEach((b, id) => {
						axios(b).then((res) => {
							newPeople[index].vehicles[id] = res.data.name;
							setTimeout(() => {
								setAllPeople([...newPeople]);
							}, a.vehicles.length * 10);
						});
					});
				});
				res.data.results.forEach((a, index) => {
					a.starships.forEach((b, id) => {
						axios(b).then((res) => {
							newPeople[index].starships[id] = res.data.name;
							setTimeout(() => {
								setAllPeople([...newPeople]);
							}, a.starships.length * 10);
						});
					});
				});
			}
			setIsLoading(false);
		});
	}, [pageNo, searchStr]);
	const handleChange = (e) => {
		setSearchStr(e.target.value);
		setPageNo(1);
	};
	const handleSort = () => {
		let newPeople = [...allPeople];
		newPeople.sort((a, b) => {
			if (a.name < b.name) return -1;
			else if (a.name === b.name) return 0;
			else return 1;
		});
		setAllPeople(newPeople);
	};
	return (
		<section className="home" style={{ backgroundImage: `url(${bg})` }}>
			<Header />
			<div className="home-hero" onClick={() => getSpecies()}>
				<span style={{ fontSize: `${font}rem` }}>Star</span>
				<span style={{ fontSize: `${font}rem` }}>Wars</span>
			</div>
			<div className="home-controls">
				<div className="home-controls-search">
					<input
						className="home-controls-search__input"
						type="text"
						placeholder="Search in Data"
						value={searchStr}
						onChange={handleChange}
					/>
				</div>
				<div className="home-controls-page">
					<div className="home-controls-sort">
						<button
							className="icon icon-sm"
							title="Sort the results alphabatically"
							onClick={handleSort}
						>
							<i className="fas fa-sort-alpha-down"></i>
						</button>
					</div>
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
						<i className="fas fa-arrow-left"></i>
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
						<i className="fas fa-arrow-right"></i>
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
						{allPeople.length === 0 ? (
							<tr>
								<td colSpan="14" className="home-data-null">
									<i className="fas fa-engine-warning"></i>
									<div>No data Found</div>
								</td>
							</tr>
						) : (
							allPeople.map((people, index) => (
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
										{people.vehicles.map(
											(vehicle, index) => (
												<div key={index}>{vehicle}</div>
											)
										)}
									</td>
									<td>
										{people.starships.map(
											(starship, index) => (
												<div key={index}>
													{starship}
												</div>
											)
										)}
									</td>
								</tr>
							))
						)}
						{isLoading && (
							<tr>
								<td
									colSpan="14"
									className="home-data-null home-data-null-spinner"
								>
									<i className="fas fa-spinner-third"></i>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{allPeople.length !== 0 && (
				<div className="home-species">
					<div className="home-species-head">All Species</div>
					<div className="home-species-cards">
						{cards.map((card, index) => (
							<div className="home-card" key={index}>
								<div className="home-card-name">
									{card.name}
								</div>
								<div className="home-card-count">
									{card.count}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default Home;
