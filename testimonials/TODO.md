# Testimonials Portal Project TODO

## Current Status
- ✅ Basic React app setup with Vite
- ✅ Testimonial form component created
- ✅ Basic styling with Tailwind CSS
- ✅ Old widget system preserved
- ❌ Supabase integration pending
- ❌ Admin moderation interface pending

## Immediate Tasks
1. [ ] Development Server
   - [ ] Ensure Vite dev server runs correctly on port 9000
   - [ ] Test testimonial form submission
   - [ ] Verify file upload functionality

2. [ ] Widget Integration Strategy
   - [ ] Decide between:
     a) Keep old widget separate (current setup)
     b) Convert widget to React component
     c) Create new React-based widget
   - [ ] Document decision and implementation plan

3. [ ] Supabase Setup
   - [ ] Create Supabase project
   - [ ] Set up database tables
   - [ ] Configure storage for photos
   - [ ] Add environment variables

## Future Enhancements
- [ ] Email notifications for new testimonials
- [ ] Testimonial search/filter functionality
- [ ] Analytics tracking
- [ ] Embeddable widget code generator
- [ ] Testimonial categories/tags

## Technical Debt
- [ ] Add proper error handling
- [ ] Implement loading states
- [ ] Add input validation
- [ ] Write tests
- [ ] Add documentation

## Questions to Resolve
1. Should we keep the old widget separate or integrate it into React?
2. What's the preferred way to handle file uploads?
3. Do we need real-time updates for the moderation queue?

## Resources
- Supabase docs: https://supabase.com/docs
- Vite docs: https://vitejs.dev/guide/
- React docs: https://react.dev/

## Notes
- Current development server: Vite (port 9000)
- Old widget accessible at /embed.html
- Need to decide on widget integration strategy 