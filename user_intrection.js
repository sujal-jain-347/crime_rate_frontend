document.querySelector("#btn_map").addEventListener("click", () => {
  console.log("hiiii");

  var cri = document.querySelector("#chloro_cime").value;
  console.log(cri);
  map1(cri);
});

document.querySelector("#btn_comm").addEventListener("click", () => {
  var name = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var comm = document.querySelector("#comm").value;

  comment(name, email, comm);

  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#comm").value = "";
});

document.querySelector("#prediction").addEventListener("click", async () => {
  var crime = document.querySelector("#pre_cri").value;
  var state = document.querySelector("#pre_state").value;

  var data = await predict(crime, state);

  console.log(data);

  document.querySelector("#pre_numbers").innerHTML = data.Numbers;
  document.querySelector("#color").innerHTML = data.reigion;

  console.log(data.reigion);

  if (data.reigion[0] === "o") {
    document.querySelector("#color").style.color = "orange";
  }
  if (data.reigion[0] === "r") {
    document.querySelector("#color").style.color = "red";
  }
  if (data.reigion[0] === "g") {
    document.querySelector("#color").style.color = "green";
  }
  if (data.reigion[0] === "y") {
    document.querySelector("#color").style.color = "yellow";
  }
});

document.querySelector("#graph").addEventListener("click", async () => {
  var plot = document.querySelector("#my_dataviz");
  plot.innerHTML = "";

  var crime = document.querySelector("#gra_cri").value;
  var state = document.querySelector("#gra_stat").value;
  var plot = document.querySelector("#gra_plt").value;

  await visual(state, crime, plot);

  var plot = document.querySelector("#my_dataviz");
  console.log(plot.innerHTML);
});

document.querySelectorAll(".btsn").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    console.log(e.target.id);

    let ht = ""

    if(e.target.id === "safe"){
        ht+="<h2>Developing a crime rate prediction model for assessing the safety of a region can be a valuable tool for various stakeholders, including residents, law enforcement agencies, policymakers, and businesses.</h2>"
        ht+="<br>"
        ht+="<h2> Accurate and effective crime prediction has become an indispensable means of curbing and combating crime. It not only reduces the occurrence of crime, diminishes economic losses, and improves public safety, it also helps governments and police agencies to reasonably deploy police resources and improve allocation efficiency. </h2>"
        ht+="<br>"
        ht+="<h2> Crime rate prediction models enable law enforcement agencies to anticipate potential crime hotspots and take proactive measures to prevent criminal activities. By deploying resources strategically to high-risk areas, authorities can deter offenders and reduce the likelihood of incidents occurring.</h2>"
    }

    if(e.target.id === "aware"){
        ht+="<h2>By providing information about crime trends and patterns, predictive models can empower communities to take proactive measures to protect themselves. This may include forming neighborhood watch groups, implementing security measures, or advocating for policy changes to address underlying factors contributing to crime.</h2>"
        ht+="<br>"
        ht+="<h2> Crime rate predictions can be used to raise public awareness about crime issues and promote safety-conscious behaviors. Public awareness campaigns can educate people about crime risks in their communities and provide tips for reducing their vulnerability to crime </h2>"
        ht+="<br>"
        ht+="<h2>Predictive models can be used to assess the risk of individuals becoming involved in criminal activity. This information can be used to tailor interventions and support services for at-risk individuals, such as counseling, job training, or substance abuse treatment programs </h2>"
    }

    if(e.target.id === "policy"){
        ht+="<h2>Predictive models can help law enforcement agencies and policymakers anticipate potential crime hotspots. By identifying areas with a higher likelihood of criminal activity, preventive measures such as increased police presence or community outreach programs can be implemented to reduce crime.</h2>"
        ht+="<br>"
        ht+="<h2>Predictive models can inform resource allocation decisions by identifying where law enforcement resources are most needed. This ensures that limited resources are allocated efficiently and effectively to areas with the highest predicted crime rates.</h2>"
        ht+="<br>"
        ht+="<h2>Crime rate predictions can inform urban planning and design strategies aimed at creating safer public spaces. Features such as improved lighting, increased visibility, and enhanced surveillance can help deter criminal activity and create environments where people feel safer to live, work, and socialize. </h2>"
    }

    if(e.target.id === "data"){
        ht+="<h2>Data-driven decision-making refers to the process of making informed decisions based on data analysis and interpretation rather than relying solely on intuition or personal experience. Artificial intelligence (AI) and machine learning (ML) play a significant role in enabling data-driven decision-making by providing tools and techniques to extract insights from large volumes of data.</h2>"
        ht+="<br>"
        ht+="<h2>Crime rate prediction models rely on data analysis and statistical techniques to generate insights. By using data-driven decision-making processes, authorities can make informed choices about crime prevention strategies, resource allocation, and policy development, leading to more effective outcomes.</h2>"
        ht+="<br>"
        ht+="<h2>Predictive models can identify specific factors or conditions associated with higher crime rates, such as socioeconomic factors, environmental conditions, or demographic trends. This information can inform the development of targeted prevention strategies tailored to address the underlying causes of crime in different communities</h2>"
    }

    document.querySelector("#inf").innerHTML = ht

    document.querySelectorAll(".btsn").forEach((ele) => {
        document.getElementById(ele.id).style.transform = "scale(1.0)"
    })

    document.getElementById(e.target.id).style.transform = "scale(1.2)"



  });
});
