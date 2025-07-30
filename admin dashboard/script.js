document.addEventListener('DOMContentLoaded', function() {
            // Sample team data
            const teamMembers = [
                {
                    id: 1,
                    name: "John Doe",
                    position: "President",
                    photo: "https://randomuser.me/api/portraits/men/1.jpg"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    position: "Secretary",
                    photo: "https://randomuser.me/api/portraits/women/1.jpg"
                },
                {
                    id: 3,
                    name: "Robert Johnson",
                    position: "Immediate President",
                    photo: "https://randomuser.me/api/portraits/men/2.jpg"
                },
                {
                    id: 4,
                    name: "Emily Davis",
                    position: "Club Mentor",
                    photo: "https://randomuser.me/api/portraits/women/2.jpg"
                }
            ];

            // Dashboard counters data
            let dashboardCounters = {
                members: 1254,
                projects: 42,
                trainers: 15,
                years: 8
            };

            // DOM Elements
            const teamGrid = document.querySelector('.team-grid');
            const addMemberBtn = document.getElementById('addMemberBtn');
            const addMemberModal = document.getElementById('addMemberModal');
            const closeModal = document.querySelector('.close-modal');
            const cancelBtn = document.querySelector('.cancel-btn');
            const memberForm = document.getElementById('memberForm');
            const memberPhotoInput = document.getElementById('memberPhoto');
            const photoPreview = document.getElementById('photoPreview');
            const fileNameDisplay = document.querySelector('.file-name');
            const counterForm = document.getElementById('counterForm');
            const counterElements = document.querySelectorAll('.counter');

            // Initialize the page
            initPage();

            function initPage() {
                renderTeamMembers();
                animateCounters();
                
                // Set initial values in the update form
                document.getElementById('membersCount').value = dashboardCounters.members;
                document.getElementById('projectsCount').value = dashboardCounters.projects;
                document.getElementById('trainersCount').value = dashboardCounters.trainers;
                document.getElementById('yearsCount').value = dashboardCounters.years;
            }

            // Display team members
            function renderTeamMembers() {
                teamGrid.innerHTML = '';
                
                teamMembers.forEach(member => {
                    const memberElement = document.createElement('div');
                    memberElement.className = 'team-member';
                    memberElement.innerHTML = `
                        <img src="${member.photo}" alt="${member.name}" class="member-photo">
                        <div class="member-info">
                            <h4 class="member-name">${member.name}</h4>
                            <p class="member-position">${member.position}</p>
                            <div class="member-actions">
                                <button class="edit-member" data-id="${member.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="delete-member" data-id="${member.id}"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    `;
                    teamGrid.appendChild(memberElement);
                });

                // Add event listeners to action buttons
                document.querySelectorAll('.edit-member').forEach(btn => {
                    btn.addEventListener('click', handleEditMember);
                });

                document.querySelectorAll('.delete-member').forEach(btn => {
                    btn.addEventListener('click', handleDeleteMember);
                });
            }

            // Animate counters on page load
            function animateCounters() {
                counterElements.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        counter.textContent = Math.floor(current);
                    }, 10);
                });
            }

            // Update counters with new values
            function updateCounters(newValues) {
                counterElements.forEach(counter => {
                    const counterType = counter.parentElement.querySelector('h3').textContent.toLowerCase();
                    const target = newValues[counterType];
                    counter.setAttribute('data-target', target);
                    
                    let current = parseInt(counter.textContent);
                    const increment = (target - current) / 20;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                            clearInterval(timer);
                            current = target;
                        }
                        counter.textContent = Math.floor(current);
                    }, 50);
                });
            }

            // Handle photo upload preview
            memberPhotoInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    fileNameDisplay.textContent = file.name;
                    
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    }
                    reader.readAsDataURL(file);
                } else {
                    fileNameDisplay.textContent = 'No file chosen';
                    photoPreview.innerHTML = '';
                }
            });

            // Modal open/close handlers
            addMemberBtn.addEventListener('click', function() {
                addMemberModal.style.display = 'flex';
                setTimeout(() => {
                    addMemberModal.classList.add('show');
                }, 10);
                memberForm.reset();
                photoPreview.innerHTML = '';
                fileNameDisplay.textContent = 'No file chosen';
                document.getElementById('memberForm').dataset.mode = 'add';
            });

            function closeModalFunc() {
                addMemberModal.classList.remove('show');
                setTimeout(() => {
                    addMemberModal.style.display = 'none';
                }, 300);
            }

            closeModal.addEventListener('click', closeModalFunc);
            cancelBtn.addEventListener('click', closeModalFunc);

            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === addMemberModal) {
                    closeModalFunc();
                }
            });

            // Form submission handler
            memberForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('memberName').value;
                const position = document.getElementById('memberPosition').value;
                const photoFile = memberPhotoInput.files[0];
                
                if (!name || !position) {
                    alert('Please fill all required fields');
                    return;
                }
                
                let photoUrl = 'https://via.placeholder.com/200';
                if (photoFile) {
                    photoUrl = URL.createObjectURL(photoFile);
                }
                
                if (this.dataset.mode === 'add') {
                    // Add new member
                    const newMember = {
                        id: Date.now(),
                        name,
                        position,
                        photo: photoUrl
                    };
                    teamMembers.push(newMember);
                    
                    // Update members counter if position is Trainer
                    if (position === 'Trainer') {
                        dashboardCounters.trainers += 1;
                        updateCounters(dashboardCounters);
                        document.getElementById('trainersCount').value = dashboardCounters.trainers;
                    }
                } else {
                    // Edit existing member
                    const memberId = parseInt(this.dataset.memberId);
                    const memberIndex = teamMembers.findIndex(m => m.id === memberId);
                    if (memberIndex !== -1) {
                        teamMembers[memberIndex] = {
                            ...teamMembers[memberIndex],
                            name,
                            position,
                            photo: photoUrl
                        };
                    }
                }
                
                renderTeamMembers();
                closeModalFunc();
            });

            // Counter form submission handler
            counterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newCounters = {
                    members: parseInt(document.getElementById('membersCount').value) || 0,
                    projects: parseInt(document.getElementById('projectsCount').value) || 0,
                    trainers: parseInt(document.getElementById('trainersCount').value) || 0,
                    years: parseInt(document.getElementById('yearsCount').value) || 0
                };
                
                dashboardCounters = newCounters;
                updateCounters(dashboardCounters);
            });

            // Edit member handler
            function handleEditMember(e) {
                const memberId = parseInt(e.currentTarget.dataset.id);
                const member = teamMembers.find(m => m.id === memberId);
                
                if (member) {
                    document.getElementById('memberName').value = member.name;
                    document.getElementById('memberPosition').value = member.position;
                    
                    // Set photo preview if it's not the placeholder
                    if (!member.photo.includes('via.placeholder.com')) {
                        photoPreview.innerHTML = `<img src="${member.photo}" alt="Preview">`;
                        fileNameDisplay.textContent = 'Current photo';
                    } else {
                        photoPreview.innerHTML = '';
                        fileNameDisplay.textContent = 'No file chosen';
                    }
                    
                    memberForm.dataset.mode = 'edit';
                    memberForm.dataset.memberId = memberId;
                    addMemberModal.style.display = 'flex';
                    setTimeout(() => {
                        addMemberModal.classList.add('show');
                    }, 10);
                }
            }

            // Delete member handler
            function handleDeleteMember(e) {
                if (confirm('Are you sure you want to delete this member?')) {
                    const memberId = parseInt(e.currentTarget.dataset.id);
                    const memberIndex = teamMembers.findIndex(m => m.id === memberId);
                    
                    if (memberIndex !== -1) {
                        // Update trainers counter if position is Trainer
                        if (teamMembers[memberIndex].position === 'Trainer') {
                            dashboardCounters.trainers = Math.max(0, dashboardCounters.trainers - 1);
                            updateCounters(dashboardCounters);
                            document.getElementById('trainersCount').value = dashboardCounters.trainers;
                        }
                        
                        teamMembers.splice(memberIndex, 1);
                        renderTeamMembers();
                    }
                }
            }
        });