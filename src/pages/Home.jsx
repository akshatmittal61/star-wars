import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import GlobalContext from "../Context/GlobalContext";
import bg from "../images/1.jpg";

const Home = () => {
	const [font, setFont] = useState(15);
	const [allPeople, setAllPeople] = useState([]);
	const [pageNo, setpageNo] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const { axiosInstance } = useContext(GlobalContext);
	useEffect(() => {
		setFont(10);
		return () => {
			console.log("Good");
		};
	}, []);
	useEffect(() => {
		axiosInstance(`people/?page=${pageNo}`).then((res) => {
			// setAllPeople(res.data.results);
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
			console.log(newPeople);
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
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
										<div key={index}>{specie}</div>
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
								<td colSpan="13">I am Loading</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Home;
