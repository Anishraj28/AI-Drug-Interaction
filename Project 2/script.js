document.addEventListener("DOMContentLoaded", function () {
    const compareButton = document.querySelector("button");
    const inputs = document.querySelectorAll("input");
  
    const drugDatabase = {
      Paracetamol: {
        uses: ["Pain relief", "Fever reduction"],
        sideEffects: ["Nausea", "Liver issues"],
        components: ["Paracetamol"],
      },
      Ibuprofen: {
        uses: ["Stomach Pain", "Treats arthritis"],
        sideEffects: ["Headache", "Dizziness"],
        components: ["Ibuprofen"],
      },
      Aspirin: {
        uses: ["Pain relief", "Blood thinner"],
        sideEffects: ["Bleeding", "Stomach upset"],
        components: ["Acetylsalicylic acid"],
      },
      Cetirizine: {
        uses: ["Allergy relief"],
        sideEffects: ["Drowsiness", "Dry mouth"],
        components: ["Cetirizine hydrochloride"],
      },
    };
  
    const interactionMessages = {
      "Paracetamol-Ibuprofen":
        "Safe to take together short-term, but monitor liver/kidney function.",
      "Aspirin-Ibuprofen":
        "May reduce the heart protection effects of aspirin. Use with caution.",
      "Paracetamol-Aspirin":
        "Generally safe together, but both can irritate the stomach in high doses.",
      "Cetirizine-Paracetamol": "No known harmful interaction.",
      "Ibuprofen-Cetirizine": "No major interaction, safe in usual doses.",
    };
  
    compareButton.addEventListener("click", function () {
      const drug1Input = inputs[0].value.trim();
      const drug2Input = inputs[1].value.trim();
  
      if (!drug1Input || !drug2Input) {
        alert("Please enter both drug names.");
        return;
      }
  
      const drug1 = formatDrugName(drug1Input);
      const drug2 = formatDrugName(drug2Input);
  
      updateDrugCard(0, drug1, drugDatabase[drug1]);
      updateDrugCard(1, drug2, drugDatabase[drug2]);
  
      showInteraction(drug1, drug2);
    });
  
    function formatDrugName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
  
    function updateDrugCard(index, drugName, data) {
      const cards = document.querySelectorAll("article");
      const card = cards[index];
      const title = card.querySelector("h2");
      const lists = card.querySelectorAll("ul");
  
      title.textContent = `${index === 0 ? "Drug 1" : "Drug 2"}: ${drugName}`;
  
      if (!data) {
        lists[0].innerHTML = "<li>Unknown drug</li>";
        lists[1].innerHTML = "<li>Unknown</li>";
        lists[2].innerHTML = "<li>Unknown</li>";
      } else {
        lists[0].innerHTML = data.uses.map((u) => `<li>${u}</li>`).join("");
        lists[1].innerHTML = data.sideEffects.map((s) => `<li>${s}</li>`).join("");
        lists[2].innerHTML = data.components.map((c) => `<li>${c}</li>`).join("");
      }
    }
  
    function showInteraction(drug1, drug2) {
      const key1 = `${drug1}-${drug2}`;
      const key2 = `${drug2}-${drug1}`;
      const message =
        interactionMessages[key1] ||
        interactionMessages[key2] ||
        "No known interaction between these drugs.";
  
      let interactionBox = document.getElementById("interaction-message");
      if (!interactionBox) {
        interactionBox = document.createElement("div");
        interactionBox.id = "interaction-message";
        interactionBox.className =
          "mt-10 p-6 text-2xl bg-yellow-100 text-yellow-800 rounded-xl fade-in max-w-[1032px] w-full";
        document.querySelector("main").appendChild(interactionBox);
      }
      interactionBox.textContent = `Interaction: ${message}`;
    }
  });
  