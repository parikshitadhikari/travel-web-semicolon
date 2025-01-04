import ExpandableCardDemo from '@/app/components/event/Card'
import SidebarDemo from '@/app/components/Sidebar'
import React from 'react'

const Event = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-200 p-6">
    <SidebarDemo />
    <h1 className="text-4xl font-bold mb-6 text-center text-white">Event Page</h1>
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Expandable Card Demo */}
      <div className="pt-12">
        <ExpandableCardDemo />
        </div>
      </div>
    </div>


  )
}

export default Event
